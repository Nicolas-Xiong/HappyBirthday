'use strict';

window.onload = function () {
	var KEYMAP = {
		'生日快乐 ': 8,
		'生日快乐  ': 9,
		'生日快乐   ': 13,
		'生日快乐    ': 16,
		'珍妮': 17,
		' 生日快乐': 18,
		'  生日快乐': 20,
		'   生日快乐': 32,
		'    生日快乐': 33,
		'珍妮 ': 34,
		'生日快乐     ': 35,
		'生日快乐      ': 36,
		// '生日快乐       ': 37,
		// '生日快乐        ': 38,
		// ' 珍妮': 39,
		// '     生日快乐': 40,
		// '      生日快乐': 45,
		// '       生日快乐': 46,
		// '        生日快乐': 48,
		// ' 珍妮': 49,
		// '生日快乐        ': 50,
		// '生日快乐         ': 51,
		// '生日快乐          ': 52,
		// '生日快乐           ': 53,
		// '珍妮  ': 54,
		// '         生日快乐': 55,
		// '          生日快乐': 56,
		// '           生日快乐': 57,
		// '            生日快乐': 65,
		// '珍妮  ': 66,
		// '生日 快乐': 67,
		// '生日  快乐': 68,
		// '生日   快乐': 69,
		// '生日    快乐': 70,
		// '  珍妮': 71,
		// '生日 快乐': 72,
		// ' 生日 快乐': 73,
		// '  生日 快乐': 74,
		// '   生日 快乐': 75,
		// '珍妮   ': 76,
		// '生日 快乐 ': 77,
		// '生日 快乐  ': 78,
		// '生日 快乐   ': 79,
		// '生日 快乐    ': 80,
		// '   珍妮': 81,
		// '生 日 快 乐': 82,
		// '  生 日 快 乐': 83,
		// '   生 日 快 乐': 84,
		// '    生 日 快 乐': 85,
		// '珍妮    ': 86,
		// '生 日 快 乐': 87,
		// '生 日 快 乐 ': 88,
		// '生 日 快 乐  ': 89,
		// '生 日 快 乐   ': 90,
		// '    珍妮': 112,
		// '生 日 快 乐    ': 113,
		// '生 日 快 乐     ': 114,
		// '生 日 快 乐      ': 115,
		// '生 日 快 乐       ': 116,
		// '珍妮     ': 117,
		// '    生 日 快 乐': 118,
		// '     生 日 快 乐': 119,
		// '      生 日 快 乐': 120,
		// '       生 日 快 乐': 121,
		// '      珍妮': 122,
		// '生  日  快  乐': 123,
		// '生  日  快  乐': 124,
		// '生  日  快  乐': 125,
		// '生  日  快  乐': 126,
		// '珍妮      ': 186,
		// '生  日  快  乐': 187,
		// '生  日  快  乐 ': 188,
		// '生  日  快  乐  ': 189,
		// '生  日  快  乐   ': 190,
		// '       珍妮': 191,
		// '生  日  快  乐': 219,
		// ' 生  日  快  乐': 220,
		// '  生  日  快  乐': 221,
		// '   生  日  快  乐': 222
	},
	    key_els = {};

	var rand = function rand() {
		var max = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
		var min = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

		var _int = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

		var gen = min + (max - min) * Math.random();
		return _int ? Math.round(gen) : gen;
	};

	(function init() {
		var a3d = document.querySelector('.a3d'),
		    f = document.createDocumentFragment(),
		    lims = [33, 41, 47, 58, 91, 127, 146],
		    len = lims.length,
		    unit = 360 / (len + 1);

		for (var p in KEYMAP) {
			var rot = document.createElement('div'),
			    key = document.createElement('div');

			key.dataset.name = p.replace('NUM_', '');
			key.dataset.code = KEYMAP[p];
			key.classList.add('key');

			for (var i = 0; i < len; i++) {
				if (KEYMAP[p] < lims[i]) {
					var hue = rand((i + .8) * unit, (i + .2) * unit, 1);
					key.style.color = 'hsl(' + hue + ',100%,65%)';
					break;
				}
			}

			rot.classList.add('rot');

			key_els[p] = key;
			rot.appendChild(key);
			f.appendChild(rot);
		}

		a3d.appendChild(f);
	})();

	addEventListener('keydown', function (e) {
		e.preventDefault();

		for (var p in KEYMAP) {
			if (e.keyCode === KEYMAP[p]) {
				if (!key_els[p].classList.contains('vis')) key_els[p].classList.add('vis');
				return;
			}
		}
	}, false);

	addEventListener('keyup', function (e) {
		e.preventDefault();
	}, false);

	addEventListener('animationend', function (e) {
		var t = e.target;
		if (e.animationName === 'hl') t.classList.remove('vis');
	}, false);
};