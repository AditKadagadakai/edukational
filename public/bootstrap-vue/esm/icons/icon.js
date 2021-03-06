function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../utils/vue';
import { mergeData } from 'vue-functional-data-merge';
import { pascalCase, trim } from '../utils/string';
import { BIconBlank } from './icons';
import { commonIconProps } from './helpers/icon-base';
var RX_ICON_PREFIX = /^BIcon/; // Helper BIcon component
// Requires the requested icon component to be installed

export var BIcon = /*#__PURE__*/Vue.extend({
  name: 'BIcon',
  functional: true,
  props: _objectSpread({
    icon: {
      type: String,
      default: null
    }
  }, commonIconProps, {
    stacked: {
      type: Boolean,
      default: false
    }
  }),
  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props,
        parent = _ref.parent;
    var icon = pascalCase(trim(props.icon || '')).replace(RX_ICON_PREFIX, '');
    var iconName = "BIcon".concat(icon); // If parent context exists, we check to see if the icon has been registered
    // Either locally in the parent component, or globally at the `$root` level
    // If not registered, we render a blank icon

    var components = ((parent || {}).$options || {}).components;
    var componentRefOrName = icon && components ? components[iconName] || BIconBlank : icon ? iconName : BIconBlank;
    return h(componentRefOrName, mergeData(data, {
      props: _objectSpread({}, props, {
        icon: null
      })
    }));
  }
});