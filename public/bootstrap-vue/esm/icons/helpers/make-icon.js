function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import { mergeData } from 'vue-functional-data-merge';
import { kebabCase, pascalCase, trim } from '../../utils/string';
import { commonIconProps, BVIconBase } from './icon-base';
/**
 * Icon component generator function
 *
 * @param {string} icon name (minus the leading `BIcon`)
 * @param {string} raw `innerHTML` for SVG
 * @return {VueComponent}
 */

export var makeIcon = function makeIcon(name, content) {
  // For performance reason we pre-compute some values, so that
  // they are not computed on each render of the icon component
  var iconName = "BIcon".concat(pascalCase(name));
  var iconNameClass = "bi-".concat(kebabCase(name));
  var svgContent = trim(content || ''); // Return the icon component definition

  return /*#__PURE__*/Vue.extend({
    name: iconName,
    functional: true,
    props: _objectSpread({}, commonIconProps, {
      stacked: {
        type: Boolean,
        default: false
      }
    }),
    render: function render(h, _ref) {
      var data = _ref.data,
          props = _ref.props;
      return h(BVIconBase, mergeData(data, {
        staticClass: iconNameClass,
        props: _objectSpread({}, props, {
          content: svgContent
        })
      }));
    }
  });
};