/* The hero's 3D, run off the page's main thread on an OffscreenCanvas, so loading three.js, compiling its shaders
   and drawing every frame never holds up a tap or a scroll. The page sends it its size, the pointer, the dive and
   the base, and it draws. */
'use strict';
self.window = self;
// the 3D modules paint their small textures (matcaps, stripes, shadows) on canvases; here those are OffscreenCanvases
self.document = { createElement: function () { return new OffscreenCanvas(1, 1); } };
importScripts('vendor/three.min.js', 'hat3d.js', 'hero3d.js');

var scene = null;
self.onmessage = function (e) {
  var m = e.data;
  if (m.type === 'init') {
    scene = self.CharlieHero.create(m.canvas, m.opts);
    scene.resize(m.opts.w, m.opts.h);
    scene.warm().then(function () {
      scene.setDessert(m.opts.base, true);
      return new Promise(function (r) { setTimeout(r, 30); });
    }).then(function () {
      if (m.intro) scene.hideForIntro(); else scene.renderOnce();
      self.postMessage({ type: 'ready' });
    });
    return;
  }
  if (!scene) return;
  if (m.type === 'intro') scene.playIntro();
  else if (m.type === 'resize') scene.resize(m.w, m.h);
  else if (m.type === 'base') scene.setDessert(m.base);
  else if (m.type === 'pointer') scene.pointer(m.x, m.y);
  else if (m.type === 'dive') scene.setDive(m.p);
  else if (m.type === 'visible') scene.setVisible(m.v);
  else if (m.type === 'still') scene.renderOnce();
  else if (m.type === 'finish') scene.finish();
  else if (m.type === 'sweets') scene.showSweets(m.v);
};
