#!/usr/bin/env python3
"""
Motivation signature generator.

Every employee is drawn as one organic bloom whose form is computed from their
own profile values. Six motivator axes set the radius around the circle; a
deterministic per-person wobble makes the contour hand-plotted rather than
geometric; concentric rings give it depth like a topographic plot.

The point of the device: a wall of these reads instantly as "everyone is
different", which is the client's own thesis ("engagement happens one person
at a time") argued as an image instead of asserted in a headline.
"""

import math

TAU = math.pi * 2

# Six motivator axes, in fixed order around the circle.
AXES = ["Recognition", "Autonomy", "Growth", "Stability", "Belonging", "Challenge"]

# One ink per dominant motivator. Blue and green are the client's real brand
# colours; the other four widen the palette deliberately (I9) because a
# per-dimension encoding needs six distinguishable hues held at matched
# chroma so the wall reads as a single system.
INKS = {
    "Recognition": "#046BD2",
    "Autonomy":    "#6C4FD8",
    "Growth":      "#12946A",
    "Stability":   "#1B8A97",
    "Belonging":   "#D2545E",
    "Challenge":   "#C77A16",
}


class LCG:
    """Tiny deterministic PRNG so a given seed always draws the same person."""

    def __init__(self, seed):
        self.s = (seed * 6364136223846793005 + 1442695040888963407) & ((1 << 64) - 1)

    def next(self):
        self.s = (self.s * 6364136223846793005 + 1442695040888963407) & ((1 << 64) - 1)
        return ((self.s >> 33) & 0x7FFFFFFF) / 0x7FFFFFFF

    def between(self, a, b):
        return a + (b - a) * self.next()


def smooth_base(vals, theta):
    """Smooth periodic interpolation of the axis values around the circle."""
    n = len(vals)
    x = (theta / TAU) * n
    i = int(math.floor(x)) % n
    f = x - math.floor(x)
    a, b = vals[i], vals[(i + 1) % n]
    t = (1 - math.cos(f * math.pi)) / 2
    return a + (b - a) * t


def harmonics(rng, count=3):
    """Low-order harmonics keep the contour closed and smooth while making it
    unmistakably this person's and not a clean polygon."""
    return [(k, rng.between(0.018, 0.055), rng.between(0, TAU))
            for k in range(2, 2 + count)]


def wobble(theta, harm):
    return sum(amp * math.sin(k * theta + ph) for k, amp, ph in harm)


def ring_path(vals, harm, scale, amp, cx, cy, rmin, rmax, steps):
    pts = []
    for j in range(steps):
        th = TAU * j / steps
        base = rmin + (rmax - rmin) * smooth_base(vals, th)
        r = scale * base * (1 + wobble(th, harm) * amp)
        pts.append((round(cx + r * math.cos(th - math.pi / 2)),
                    round(cy + r * math.sin(th - math.pi / 2))))
    d = "M" + " ".join(f"{x} {y}" for x, y in pts) + "Z"
    return d.replace("M", "M", 1)


INKS_DARK = {
    "Recognition": "#4E9BF0",
    "Autonomy":    "#9C86F2",
    "Growth":      "#2FC492",
    "Stability":   "#3BBAC8",
    "Belonging":   "#F0838C",
    "Challenge":   "#E7A94C",
}


def signature(seed, vals, dominant, size=400, rings=9, steps=72,
              ticks=True, core=True, opacity_floor=0.30, dark=False):
    """Return one <svg> element drawing this person's motivation signature."""
    rng = LCG(seed)
    harm = harmonics(rng)
    if dark:
        opacity_floor = max(opacity_floor, 0.58)
    ink = (INKS_DARK if dark else INKS)[dominant]
    cx = cy = size / 2
    rmax = size * 0.44
    rmin = size * 0.085

    out = [
        f'<svg class="sig" viewBox="0 0 {size} {size}" role="img" '
        f'preserveAspectRatio="xMidYMid meet" aria-hidden="true">'
    ]

    # concentric contours, tightest in the middle
    for i in range(rings):
        t = (i + 1) / rings
        scale = 0.16 + 0.84 * (t ** 1.18)
        amp = 0.55 + 1.5 * t
        op = round(opacity_floor + (0.92 - opacity_floor) * (t ** 1.5), 3)
        sw = round(0.9 + 0.7 * t, 2)
        d = ring_path(vals, harm, scale, amp * 0.9, cx, cy, rmin, rmax, steps)
        out.append(
            f'<path d="{d}" fill="none" stroke="{ink}" stroke-width="{sw}" '
            f'opacity="{op}" stroke-linejoin="round"/>'
        )

    # axis ticks just outside the outer contour, one per motivator
    if ticks:
        for i, v in enumerate(vals):
            th = TAU * i / len(vals) - math.pi / 2
            base = rmin + (rmax - rmin) * v
            r0 = base * 1.035
            r1 = base * 1.035 + (5 + 9 * v)
            out.append(
                f'<line x1="{round(cx + r0 * math.cos(th))}" '
                f'y1="{round(cy + r0 * math.sin(th))}" '
                f'x2="{round(cx + r1 * math.cos(th))}" '
                f'y2="{round(cy + r1 * math.sin(th))}" '
                f'stroke="{ink}" stroke-width="2" opacity="0.62"/>'
            )

    if core:
        out.append(f'<circle cx="{cx}" cy="{cy}" r="2.4" fill="{ink}"/>')

    out.append("</svg>")
    return "".join(out)


def dominant_of(vals):
    return AXES[vals.index(max(vals))]
