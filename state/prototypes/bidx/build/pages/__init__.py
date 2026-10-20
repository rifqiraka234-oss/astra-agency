"""Every page of the BidX build. build_all returns (relative path, html) pairs."""
from . import home, guides, calls, fit, desk


def build_all(B):
    out = []
    out += home.build(B)
    out += guides.build(B)
    out += calls.build(B)
    out += fit.build(B)
    out += desk.build(B)
    return out
