function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import { mergeData } from 'vue-functional-data-merge';
import { getComponentConfig } from '../../utils/config';
import pluckProps from '../../utils/pluck-props';
import { BLink, propsFactory as linkPropsFactory } from '../link/link';
var NAME = 'BBadge';
var linkProps = linkPropsFactory();
delete linkProps.href.default;
delete linkProps.to.default;
export var props = _objectSpread({}, linkProps, {
  tag: {
    type: String,
    default: 'span'
  },
  variant: {
    type: String,
    default: function _default() {
      return getComponentConfig(NAME, 'variant');
    }
  },
  pill: {
    type: Boolean,
    default: false
  }
}); // @vue/component

export var BBadge = /*#__PURE__*/Vue.extend({
  name: NAME,
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    var isBLink = props.href || props.to;
    var tag = isBLink ? BLink : props.tag;
    var componentData = {
      staticClass: 'badge',
      class: [props.variant ? "badge-".concat(props.variant) : 'badge-secondary', {
        'badge-pill': props.pill,
        active: props.active,
        disabled: props.disabled
      }],
      props: isBLink ? pluckProps(linkProps, props) : {}
    };
    return h(tag, mergeData(data, componentData), children);
  }
});