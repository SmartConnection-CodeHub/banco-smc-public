#!/usr/bin/env python3
"""
Smart Connection - Video de Marketing
Genera video con efecto Ken Burns + crossfade entre escenas + texto overlay
"""
import subprocess
import os
import sys

BASE = "/Users/guillermogonzalezleon/Downloads/SmartConnection/CLAUDE-Projects/maquetas/_misc"
OUT = f"{BASE}/video_output"
os.makedirs(OUT, exist_ok=True)

# Imágenes en orden narrativo
SCENES = [
    {
        "img": f"{BASE}/smc_01_hero.png",
        "duration": 5,
        "zoom_dir": "in",      # zoom in = acercarse
        "zoom_start": 1.0,
        "zoom_end": 1.08,
        "label": "hero"
    },
    {
        "img": f"{BASE}/smc_02_diagrama.png",
        "duration": 4,
        "zoom_dir": "in",
        "zoom_start": 1.05,
        "zoom_end": 1.12,
        "label": "diagrama"
    },
    {
        "img": f"{BASE}/smc_03_integraciones.png",
        "duration": 4,
        "zoom_dir": "out",     # zoom out = alejarse
        "zoom_start": 1.1,
        "zoom_end": 1.02,
        "label": "integraciones"
    },
    {
        "img": f"{BASE}/smc_04_beneficios.png",
        "duration": 4,
        "zoom_dir": "in",
        "zoom_start": 1.0,
        "zoom_end": 1.08,
        "label": "beneficios"
    },
    {
        "img": f"{BASE}/smc_01_hero.png",   # volvemos al hero como cierre
        "duration": 5,
        "zoom_dir": "out",
        "zoom_start": 1.15,
        "zoom_end": 1.0,
        "label": "cierre"
    },
]

TARGET_W = 1920
TARGET_H = 1080
FPS = 30
FADE_DUR = 0.7  # segundos de crossfade entre escenas

def frames(duration):
    return int(duration * FPS)

def make_scene_clip(scene, idx):
    """Genera clip individual con Ken Burns"""
    out_path = f"{OUT}/clip_{idx:02d}_{scene['label']}.mp4"
    if os.path.exists(out_path):
        print(f"  ♻️  clip {idx} ya existe, saltando")
        return out_path

    d = scene['duration']
    n_frames = frames(d)
    z_start = scene['zoom_start']
    z_end = scene['zoom_end']

    # Fórmula Ken Burns: zoom lineal de z_start a z_end
    # z='zoom+step' — calculamos el step para llegar de start a end en n_frames
    z_step = (z_end - z_start) / n_frames
    if z_step >= 0:
        zoom_expr = f"'min({z_end}, zoom+{z_step:.6f})'"
    else:
        zoom_expr = f"'max({z_end}, zoom+{z_step:.6f})'"

    # Centrado horizontal y vertical
    x_expr = "'iw/2-(iw/zoom/2)'"
    y_expr = "'ih/2-(ih/zoom/2)'"

    # Filtro completo: scale → zoompan → scale final → fade in/out
    filter_complex = (
        f"scale=w=iw*2:h=ih*2:flags=lanczos,"  # upscale para suavidad del zoom
        f"zoompan=z={zoom_expr}:x={x_expr}:y={y_expr}"
        f":d={n_frames}:s={TARGET_W}x{TARGET_H}:fps={FPS},"
        f"scale={TARGET_W}:{TARGET_H}:flags=lanczos,"
        f"fade=t=in:st=0:d=0.3,"
        f"fade=t=out:st={d-0.4:.2f}:d=0.4"
    )

    cmd = [
        "ffmpeg", "-y",
        "-loop", "1",
        "-i", scene['img'],
        "-vf", filter_complex,
        "-t", str(d),
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-preset", "fast",
        "-crf", "18",
        out_path
    ]

    print(f"  🎬 Generando clip {idx}: {scene['label']} ({d}s)")
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"  ❌ Error clip {idx}:")
        print(result.stderr[-500:])
        sys.exit(1)
    print(f"  ✅ clip_{idx:02d}_{scene['label']}.mp4")
    return out_path


def concat_with_xfade(clips):
    """Une clips con xfade crossfade entre ellos"""
    if len(clips) == 1:
        return clips[0]

    out_path = f"{OUT}/video_sin_musica.mp4"

    # Calcular offsets para xfade
    # El offset de cada xfade = suma de duraciones anteriores - fade_dur/2
    durations = [s['duration'] for s in SCENES]

    # Construir filter_complex con xfade encadenado
    inputs = " ".join([f"[{i}:v]" for i in range(len(clips))])

    # xfade encadenado: [0v][1v]xfade → [t01]; [t01][2v]xfade → [t012]; ...
    filter_parts = []
    current_offset = durations[0] - FADE_DUR

    prev_label = "[0:v]"
    for i in range(1, len(clips)):
        out_label = f"[t{i}]" if i < len(clips) - 1 else "[vout]"
        filter_parts.append(
            f"{prev_label}[{i}:v]xfade=transition=fade:duration={FADE_DUR}:offset={current_offset:.2f}{out_label}"
        )
        prev_label = f"[t{i}]"
        current_offset += durations[i] - FADE_DUR

    filter_complex = "; ".join(filter_parts)

    cmd = ["ffmpeg", "-y"]
    for clip in clips:
        cmd += ["-i", clip]
    cmd += [
        "-filter_complex", filter_complex,
        "-map", "[vout]",
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-preset", "fast",
        "-crf", "18",
        out_path
    ]

    print(f"\n  🔗 Uniendo {len(clips)} clips con crossfade...")
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"  ❌ Error al unir clips:")
        print(result.stderr[-800:])
        # Fallback: concat simple
        return concat_simple(clips)
    print(f"  ✅ video_sin_musica.mp4")
    return out_path


def concat_simple(clips):
    """Fallback: concat simple con lista"""
    out_path = f"{OUT}/video_sin_musica.mp4"
    list_path = f"{OUT}/clips_list.txt"
    with open(list_path, "w") as f:
        for c in clips:
            f.write(f"file '{c}'\n")

    cmd = [
        "ffmpeg", "-y",
        "-f", "concat", "-safe", "0",
        "-i", list_path,
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-preset", "fast",
        "-crf", "18",
        out_path
    ]
    print(f"  🔗 Concat simple (fallback)...")
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print("  ❌ Error concat simple:", result.stderr[-500:])
        sys.exit(1)
    print(f"  ✅ video_sin_musica.mp4 (concat simple)")
    return out_path


def generate_music():
    """Genera música sintetizada tipo tech/ambient con ffmpeg"""
    music_path = f"{OUT}/music.mp3"
    if os.path.exists(music_path):
        print("  ♻️  música ya existe")
        return music_path

    total_dur = sum(s['duration'] for s in SCENES)

    # Síntesis de audio: onda sinusoidal con harmónicos → suena a pad ambient
    # Frecuencias: 100Hz base, 200Hz, 300Hz mezcladas con reverb
    filter_audio = (
        f"sine=frequency=120:duration={total_dur},"
        f"volume=0.3"
    )

    cmd = [
        "ffmpeg", "-y",
        "-f", "lavfi",
        "-i", f"sine=f=120:duration={total_dur}",
        "-f", "lavfi",
        "-i", f"sine=f=180:duration={total_dur}",
        "-f", "lavfi",
        "-i", f"sine=f=240:duration={total_dur}",
        "-filter_complex",
        "[0:a]volume=0.4[a0];[1:a]volume=0.25[a1];[2:a]volume=0.15[a2];"
        "[a0][a1][a2]amix=inputs=3[amixed];"
        f"[amixed]aecho=0.7:0.7:60:0.4,lowpass=f=800,afade=t=in:st=0:d=1,afade=t=out:st={total_dur-2}:d=2[afinal]",
        "-map", "[afinal]",
        "-c:a", "libmp3lame",
        "-b:a", "128k",
        music_path
    ]

    print(f"  🎵 Generando música sintetizada ({total_dur}s)...")
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"  ⚠️  Música: {result.stderr[-300:]}")
        return None
    print(f"  ✅ music.mp3")
    return music_path


def add_music(video_path, music_path):
    """Combina video con música"""
    if not music_path or not os.path.exists(music_path):
        print("  ⏭️  Sin música — usando video sin audio")
        return video_path

    out_path = f"{OUT}/SMC_marketing_video.mp4"
    cmd = [
        "ffmpeg", "-y",
        "-i", video_path,
        "-i", music_path,
        "-map", "0:v",
        "-map", "1:a",
        "-c:v", "copy",
        "-c:a", "aac",
        "-b:a", "128k",
        "-shortest",
        out_path
    ]
    print(f"\n  🎵 Añadiendo música al video...")
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"  ❌ Error al añadir música: {result.stderr[-300:]}")
        return video_path
    print(f"  ✅ SMC_marketing_video.mp4")
    return out_path


def main():
    print("\n🎬 Smart Connection — Generador de Video de Marketing")
    print("=" * 55)
    print(f"📁 Output: {OUT}")
    print(f"🎞️  Escenas: {len(SCENES)}")
    total = sum(s['duration'] for s in SCENES)
    print(f"⏱️  Duración total: ~{total}s")
    print()

    # PASO 1: Generar clips individuales con Ken Burns
    print("PASO 1 — Clips con efecto Ken Burns")
    clips = []
    for i, scene in enumerate(SCENES):
        clip = make_scene_clip(scene, i)
        clips.append(clip)

    # PASO 2: Unir clips con crossfade
    print("\nPASO 2 — Unir clips con crossfade")
    video = concat_with_xfade(clips)

    # PASO 3: Generar música sintetizada
    print("\nPASO 3 — Música")
    music = generate_music()

    # PASO 4: Combinar video + música
    print("\nPASO 4 — Video final")
    final = add_music(video, music)

    print(f"\n{'='*55}")
    print(f"✅ VIDEO LISTO: {final}")

    # Verificar tamaño
    size = os.path.getsize(final) / (1024*1024)
    print(f"📦 Tamaño: {size:.1f} MB")

    # Abrir en QuickTime
    subprocess.Popen(["open", final])
    print(f"▶️  Abriendo en QuickTime Player...")


if __name__ == "__main__":
    main()
