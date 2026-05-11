#!/usr/bin/env python3
"""
Smart Connection — Video Marketing v2
Motion graphics con texto, fondos abstractos animados, sin pantallazos del sitio.
6 escenas según los prompts de Veo.
"""
import subprocess, os, sys, shutil

BASE = "/Users/guillermogonzalezleon/Downloads/SmartConnection/CLAUDE-Projects/maquetas/_misc"
OUT  = f"{BASE}/video_output_v2"
os.makedirs(OUT, exist_ok=True)

FONT_BOLD  = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_BLACK = "/System/Library/Fonts/Supplemental/Arial Black.ttf"
FONT_REG   = "/System/Library/Fonts/Supplemental/Arial.ttf"
W, H, FPS  = 1920, 1080, 30

# ──────────────────────────────────────────────
# ESCENAS: fondo, texto, duración
# ──────────────────────────────────────────────
SCENES = [
    {
        "id": 0, "label": "s1_automatizamos",
        "text": "Automatizamos tu éxito con IA.",
        "sub": "",
        "duration": 3.5,
        # Fondo: círculos concéntricos pulsantes púrpura/violeta sobre negro
        "bg_filter": (
            "nullsrc=size=1920x1080:rate=30,"
            "geq="
            "r='clip(30 + 80*cos(2*3.14159*hypot(X-960,Y-540)/120 - t*5) + 20*cos(2*3.14159*hypot(X-960,Y-540)/60 - t*8), 0, 255)':"
            "g='clip(0  + 20*cos(2*3.14159*hypot(X-960,Y-540)/120 - t*5), 0, 255)':"
            "b='clip(60 + 100*sin(2*3.14159*hypot(X-960,Y-540)/120 - t*5) + 40*sin(t*3), 0, 255)'"
        ),
        "text_color": "white",
        "text_size": 88,
        "text_y": "h/2",
    },
    {
        "id": 1, "label": "s2_proyecto",
        "text": "¿Tienes un proyecto comercial?",
        "sub": "",
        "duration": 3.0,
        # Fondo: espacio oscuro con partículas de luz azul/cian flotando
        "bg_filter": (
            "nullsrc=size=1920x1080:rate=30,"
            "geq="
            "r='clip(5  + 30*pow(sin(X/80+t*2)*sin(Y/80+t*1.5),4), 0, 255)':"
            "g='clip(10 + 60*pow(sin(X/60+t*2.5)*sin(Y/90+t*2),4) + 20*sin(t*4+X/200), 0, 255)':"
            "b='clip(30 + 120*pow(sin(X/70+t*3)*sin(Y/70+t*2.5),4) + 30*cos(t*3+Y/200), 0, 255)'"
        ),
        "text_color": "white",
        "text_size": 80,
        "text_y": "h/2",
    },
    {
        "id": 2, "label": "s3_realidad",
        "text": "Nosotros lo hacemos realidad.",
        "sub": "",
        "duration": 3.0,
        # Fondo: blanco brillante con gradiente suave hacia gris perla
        "bg_filter": (
            "nullsrc=size=1920x1080:rate=30,"
            "geq="
            "r='clip(240 + 15*sin(X/300+t*0.8)*sin(Y/400+t*0.6), 0, 255)':"
            "g='clip(235 + 12*sin(X/350+t*0.7)*cos(Y/350+t*0.5), 0, 255)':"
            "b='clip(245 + 10*cos(X/280+t*0.9)*sin(Y/300+t*0.7), 0, 255)'"
        ),
        "text_color": "0x6C00D4",   # púrpura marca SMC
        "text_size": 88,
        "text_y": "h/2",
    },
    {
        "id": 3, "label": "s4_administrativos",
        "text": "Sistemas Administrativos Inteligentes.",
        "sub": "",
        "duration": 3.0,
        # Fondo: modo oscuro con grid de líneas y acentos púrpura flotando
        "bg_filter": (
            "nullsrc=size=1920x1080:rate=30,"
            "geq="
            "r='clip(8  + 40*max(0, cos(2*3.14159*X/160)*cos(2*3.14159*Y/90)) + 30*cos(2*3.14159*X/160)*sin(t*2), 0, 255)':"
            "g='clip(3  + 10*max(0, cos(2*3.14159*X/160)*cos(2*3.14159*Y/90)), 0, 255)':"
            "b='clip(15 + 80*max(0, cos(2*3.14159*X/160)*cos(2*3.14159*Y/90)) + 40*sin(t*2+X/400), 0, 255)'"
        ),
        "text_color": "white",
        "text_size": 78,
        "text_y": "h/2",
    },
    {
        "id": 4, "label": "s5_saas",
        "text": "Software SaaS a medida.",
        "sub": "",
        "duration": 3.0,
        # Fondo: oscuro intenso con ondas de datos fluyendo (degradado diagonal animado)
        "bg_filter": (
            "nullsrc=size=1920x1080:rate=30,"
            "geq="
            "r='clip(5  + 15*sin((X+Y)/100 + t*4), 0, 255)':"
            "g='clip(5  + 10*cos((X+Y)/120 + t*3), 0, 255)':"
            "b='clip(20 + 60*sin((X+Y)/80  + t*5) + 30*cos(X/150 - t*3) + 20*sin(Y/100+t*2), 0, 255)'"
        ),
        "text_color": "white",
        "text_size": 96,
        "text_y": "h/2",
    },
    {
        "id": 5, "label": "s6_outro",
        "text": "Smart Connection.",
        "sub": "smconnection.cl",
        "duration": 4.5,
        # Fondo: negro con destellos de luz púrpura en los bordes (light leaks)
        "bg_filter": (
            "nullsrc=size=1920x1080:rate=30,"
            "geq="
            "r='clip(0  + 80*max(0, cos(X/120 + t*1.5)) * max(0, sin(Y/200 + t)) * pow(sin(t*1.5),2), 0, 255)':"
            "g='0':"
            "b='clip(0  + 120*max(0, sin(X/100 + t*2)) * max(0, cos(Y/150 + t*1.2)) * pow(cos(t*2),2), 0, 255)'"
        ),
        "text_color": "white",
        "text_size": 100,
        "text_y": "(h/2)-60",
    },
]

# ──────────────────────────────────────────────
def make_clip(scene):
    """Genera un clip con fondo animado + texto"""
    out_path = f"{OUT}/clip_{scene['id']:02d}_{scene['label']}.mp4"
    d = scene['duration']
    n_frames = int(d * FPS)
    fade_in  = 0.4
    fade_out = 0.5
    fade_out_st = d - fade_out - 0.05

    text_x = "(w-text_w)/2"
    text_y = scene["text_y"]

    # Texto principal
    dt_main = (
        f"drawtext=fontfile='{FONT_BLACK}':"
        f"text='{scene['text']}':"
        f"fontsize={scene['text_size']}:"
        f"fontcolor={scene['text_color']}:"
        f"x={text_x}:y={text_y}:"
        f"enable='gte(t,{fade_in})'"
    )

    filters = [scene["bg_filter"]]

    # Fade in/out de fondo
    filters.append(f"fade=t=in:st=0:d={fade_in}")
    filters.append(f"fade=t=out:st={fade_out_st:.2f}:d={fade_out}")

    # Texto principal
    filters.append(dt_main)

    # Subtítulo (solo escena 6)
    if scene.get("sub"):
        dt_sub = (
            f"drawtext=fontfile='{FONT_BOLD}':"
            f"text='{scene['sub']}':"
            f"fontsize=52:"
            f"fontcolor=0xBBBBBB:"
            f"x=(w-text_w)/2:y=(h/2)+60:"
            f"enable='gte(t,{fade_in+0.3})'"
        )
        filters.append(dt_sub)

    vf = ",".join(filters)

    cmd = [
        "ffmpeg", "-y",
        "-f", "lavfi",
        "-i", f"{scene['bg_filter']},format=rgb24",
        "-f", "lavfi",
        "-i", f"{scene['bg_filter']},format=rgb24",
        "-vf", vf,
        "-t", str(d),
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-preset", "fast",
        "-crf", "18",
        out_path
    ]

    # Comando simplificado: una sola entrada lavfi
    cmd2 = [
        "ffmpeg", "-y",
        "-f", "lavfi",
        "-i", f"{scene['bg_filter']}",
        "-vf", vf,
        "-t", str(d),
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-preset", "fast",
        "-crf", "18",
        out_path
    ]

    print(f"  🎬 Escena {scene['id']+1}: {scene['text'][:40]}...")
    result = subprocess.run(cmd2, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"     ❌ Error: {result.stderr[-400:]}")
        return None
    size_kb = os.path.getsize(out_path) / 1024
    print(f"     ✅ {os.path.basename(out_path)} ({size_kb:.0f} KB)")
    return out_path


def concat_xfade(clips, durations):
    """Une clips con crossfade xfade"""
    out = f"{OUT}/video_final.mp4"
    fade = 0.5

    if len(clips) == 1:
        shutil.copy(clips[0], out)
        return out

    # Construir filter_complex con xfade encadenado
    parts = []
    offset = durations[0] - fade
    prev = "[0:v]"
    for i in range(1, len(clips)):
        lbl = f"[v{i}]" if i < len(clips)-1 else "[vout]"
        parts.append(f"{prev}[{i}:v]xfade=transition=fade:duration={fade}:offset={offset:.3f}{lbl}")
        prev = f"[v{i}]"
        offset += durations[i] - fade

    fc = "; ".join(parts)

    cmd = ["ffmpeg", "-y"]
    for c in clips:
        cmd += ["-i", c]
    cmd += ["-filter_complex", fc, "-map", "[vout]",
            "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "fast", "-crf", "18", out]

    print(f"\n  🔗 Uniendo {len(clips)} escenas con crossfade...")
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print(f"  ❌ xfade error, usando concat simple: {r.stderr[-300:]}")
        return concat_simple(clips, out)
    print(f"  ✅ video_final.mp4")
    return out


def concat_simple(clips, out):
    lst = f"{OUT}/list.txt"
    with open(lst, "w") as f:
        for c in clips:
            f.write(f"file '{c}'\n")
    cmd = ["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", lst,
           "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "fast", "-crf", "18", out]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print("❌ concat simple error:", r.stderr[-300:])
        sys.exit(1)
    return out


def gen_music_futurebass(total_dur):
    """
    Síntesis Future Bass aproximada:
    - Sub bass: 60 Hz modulado
    - Pad: acordes Cmaj7 en armónicos (261, 329, 391, 493 Hz)
    - Hi-freq shimmer: 2000 Hz
    - Ritmo: amplitude gate a 126 BPM (~0.476s por beat)
    """
    out = f"{OUT}/music_futurebass.aac"
    bpm = 126
    beat = 60.0 / bpm  # 0.476 s

    # Pad acordes (Cmaj7: C4=261, E4=329, G4=391, B4=493)
    pad_freqs = [261.6, 329.6, 392.0, 493.9]
    pad_filter = "+".join([f"0.12*sin(2*PI*{f}*t)" for f in pad_freqs])

    # Sub bass
    sub = f"0.35*sin(2*PI*60*t)*sin(2*PI*{beat}*t/2+PI/2)"

    # Shimmer
    shimmer = f"0.04*sin(2*PI*2000*t)*sin(PI*t/{beat})"

    # Beat gate: simula kick at every beat usando envelope
    gate = f"max(0, cos(2*PI*t/{beat})-0.3)/0.7"

    # Mezcla final
    expr = f"({pad_filter})*0.6 + {sub}*{gate} + {shimmer}"

    filter_complex = (
        f"sine=f=1:duration={total_dur+1},"       # dummy para pipe
        f"aevalsrc=exprs='{expr}':s=44100:d={total_dur+1},"
        f"afade=t=in:st=0:d=1.0,"
        f"afade=t=out:st={total_dur-1.5:.1f}:d=1.5,"
        f"aecho=0.6:0.5:40:0.3,"
        f"highpass=f=40,"
        f"lowpass=f=8000,"
        f"dynaudnorm"
    )

    cmd = [
        "ffmpeg", "-y",
        "-f", "lavfi",
        "-i", f"aevalsrc=exprs='{expr}':s=44100:d={total_dur+1}",
        "-af", f"afade=t=in:st=0:d=1.0,afade=t=out:st={total_dur-1.5:.1f}:d=1.5,aecho=0.6:0.5:40:0.3,highpass=f=40,lowpass=f=8000,dynaudnorm",
        "-t", str(total_dur),
        "-c:a", "aac",
        "-b:a", "192k",
        out
    ]

    print(f"  🎵 Generando Future Bass sintetizado ({total_dur:.1f}s, 126 BPM)...")
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print(f"  ⚠️  Error música: {r.stderr[-200:]}")
        return None
    print(f"  ✅ music_futurebass.aac")
    return out


def combine(video, music):
    out = f"{OUT}/SMC_marketing_final.mp4"
    if not music or not os.path.exists(music):
        shutil.copy(video, out)
        return out

    cmd = [
        "ffmpeg", "-y",
        "-i", video,
        "-i", music,
        "-map", "0:v", "-map", "1:a",
        "-c:v", "copy",
        "-c:a", "aac", "-b:a", "192k",
        "-shortest",
        out
    ]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print(f"  ❌ Error combine: {r.stderr[-200:]}")
        return video
    print(f"  ✅ SMC_marketing_final.mp4")
    return out


def main():
    print("\n🎬 Smart Connection — Video Marketing v2")
    print("=" * 55)
    print("📍 Sin pantallazos de sitio — 100% motion graphics")
    print(f"🎞️  6 escenas | texto + fondos abstractos animados")
    total = sum(s['duration'] for s in SCENES)
    print(f"⏱️  Duración: ~{total:.0f}s | 1920×1080 | 30fps")
    print(f"📁 Output: {OUT}\n")

    # PASO 1: Generar clips
    print("═══ PASO 1 — Motion Graphics por Escena ═══")
    clips = []
    durations = []
    for scene in SCENES:
        clip = make_clip(scene)
        if clip:
            clips.append(clip)
            durations.append(scene['duration'])
        else:
            print(f"  ⚠️  Escena {scene['id']+1} falló — saltando")

    if not clips:
        print("❌ No se generó ningún clip"); sys.exit(1)

    # PASO 2: Unir con crossfade
    print("\n═══ PASO 2 — Unir Escenas ═══")
    video = concat_xfade(clips, durations)

    # PASO 3: Música Future Bass
    print("\n═══ PASO 3 — Música Future Bass Sintetizada ═══")
    music = gen_music_futurebass(total)

    # PASO 4: Video final
    print("\n═══ PASO 4 — Video Final ═══")
    final = combine(video, music)

    size_mb = os.path.getsize(final) / (1024*1024)
    print(f"\n{'='*55}")
    print(f"✅ LISTO: {final}")
    print(f"📦 Tamaño: {size_mb:.1f} MB")

    subprocess.Popen(["open", final])
    print(f"▶️  Abriendo en QuickTime Player...")


if __name__ == "__main__":
    main()
