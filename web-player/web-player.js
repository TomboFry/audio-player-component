(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // node_modules/@r2wc/core/dist/core.js
  function J2(t3) {
    return t3.replace(
      /([a-z0-9])([A-Z])/g,
      (e3, s3, c3) => `${s3}-${c3.toLowerCase()}`
    );
  }
  function _3(t3, e3, s3) {
    var k3, O3, j3;
    e3.props || (e3.props = t3.propTypes ? Object.keys(t3.propTypes) : []);
    const c3 = Array.isArray(e3.props) ? e3.props.slice() : Object.keys(e3.props), b2 = {}, m3 = {}, w5 = {};
    for (const r3 of c3) {
      b2[r3] = Array.isArray(e3.props) ? "string" : e3.props[r3];
      const u4 = J2(r3);
      m3[r3] = u4, w5[u4] = r3;
    }
    class S2 extends HTMLElement {
      constructor() {
        super();
        h3(this, k3, true);
        h3(this, O3);
        h3(this, j3, {});
        h3(this, "container");
        e3.shadow ? this.container = this.attachShadow({
          mode: e3.shadow
        }) : this.container = this, this[p3].container = this.container;
        for (const n2 of c3) {
          const f4 = m3[n2], o3 = this.getAttribute(f4), i4 = b2[n2], a3 = i4 ? A4[i4] : null;
          a3 != null && a3.parse && o3 && (this[p3][n2] = a3.parse(o3, f4, this));
        }
      }
      static get observedAttributes() {
        return Object.keys(w5);
      }
      connectedCallback() {
        this[g4] = true, this[d3]();
      }
      disconnectedCallback() {
        this[g4] = false, this[l3] && s3.unmount(this[l3]), delete this[l3];
      }
      attributeChangedCallback(n2, f4, o3) {
        const i4 = w5[n2], a3 = b2[i4], y3 = a3 ? A4[a3] : null;
        i4 in b2 && (y3 != null && y3.parse) && o3 && (this[p3][i4] = y3.parse(o3, n2, this), this[d3]());
      }
      [(k3 = g4, O3 = l3, j3 = p3, d3)]() {
        this[g4] && (this[l3] ? s3.update(this[l3], this[p3]) : this[l3] = s3.mount(
          this.container,
          t3,
          this[p3]
        ));
      }
    }
    for (const r3 of c3) {
      const u4 = m3[r3], n2 = b2[r3];
      Object.defineProperty(S2.prototype, r3, {
        enumerable: true,
        configurable: true,
        get() {
          return this[p3][r3];
        },
        set(f4) {
          this[p3][r3] = f4;
          const o3 = n2 ? A4[n2] : null;
          if (o3 != null && o3.stringify) {
            const i4 = o3.stringify(f4, u4, this);
            this.getAttribute(u4) !== i4 && this.setAttribute(u4, i4);
          } else
            this[d3]();
        }
      });
    }
    return S2;
  }
  var C4, x3, h3, T4, V4, N2, P3, $3, A4, d3, g4, l3, p3;
  var init_core = __esm({
    "node_modules/@r2wc/core/dist/core.js"() {
      C4 = Object.defineProperty;
      x3 = (t3, e3, s3) => e3 in t3 ? C4(t3, e3, { enumerable: true, configurable: true, writable: true, value: s3 }) : t3[e3] = s3;
      h3 = (t3, e3, s3) => (x3(t3, typeof e3 != "symbol" ? e3 + "" : e3, s3), s3);
      T4 = {
        stringify: (t3) => t3,
        parse: (t3) => t3
      };
      V4 = {
        stringify: (t3) => `${t3}`,
        parse: (t3) => parseFloat(t3)
      };
      N2 = {
        stringify: (t3) => t3 ? "true" : "false",
        parse: (t3) => /^[ty1-9]/i.test(t3)
      };
      P3 = {
        stringify: (t3) => t3.name,
        parse: (t3, e3, s3) => {
          const c3 = (() => {
            if (typeof window < "u" && t3 in window)
              return window[t3];
            if (typeof global < "u" && t3 in global)
              return global[t3];
          })();
          return typeof c3 == "function" ? c3.bind(s3) : void 0;
        }
      };
      $3 = {
        stringify: (t3) => JSON.stringify(t3),
        parse: (t3) => JSON.parse(t3)
      };
      A4 = {
        string: T4,
        number: V4,
        boolean: N2,
        function: P3,
        json: $3
      };
      d3 = Symbol.for("r2wc.render");
      g4 = Symbol.for("r2wc.connected");
      l3 = Symbol.for("r2wc.context");
      p3 = Symbol.for("r2wc.props");
    }
  });

  // node_modules/react-to-webcomponent/dist/react-to-webcomponent.js
  var react_to_webcomponent_exports = {};
  __export(react_to_webcomponent_exports, {
    default: () => w4
  });
  function w4(m3, i4, e3, d4 = {}) {
    function f4(r3, n2, u4) {
      const o3 = i4.createElement(n2, u4);
      if ("createRoot" in e3) {
        const t3 = e3.createRoot(r3);
        return t3.render(o3), {
          container: r3,
          root: t3,
          ReactComponent: n2
        };
      }
      if ("render" in e3)
        return e3.render(o3, r3), {
          container: r3,
          ReactComponent: n2
        };
      throw new Error("Invalid ReactDOM instance provided.");
    }
    function p4({ container: r3, root: n2, ReactComponent: u4 }, o3) {
      const t3 = i4.createElement(u4, o3);
      if (n2) {
        n2.render(t3);
        return;
      }
      if ("render" in e3) {
        e3.render(t3, r3);
        return;
      }
    }
    function l4({ container: r3, root: n2 }) {
      if (n2) {
        n2.unmount();
        return;
      }
      if ("unmountComponentAtNode" in e3) {
        e3.unmountComponentAtNode(r3);
        return;
      }
    }
    return _3(m3, d4, { mount: f4, unmount: l4, update: p4 });
  }
  var init_react_to_webcomponent = __esm({
    "node_modules/react-to-webcomponent/dist/react-to-webcomponent.js"() {
      init_core();
    }
  });

  // node_modules/preact/dist/preact.module.js
  var preact_module_exports = {};
  __export(preact_module_exports, {
    Component: () => b,
    Fragment: () => k,
    cloneElement: () => E,
    createContext: () => G,
    createElement: () => _,
    createRef: () => m,
    h: () => _,
    hydrate: () => D,
    isValidElement: () => t,
    options: () => l,
    render: () => B,
    toChildArray: () => H
  });
  var n;
  var l;
  var u;
  var t;
  var i;
  var o;
  var r;
  var f;
  var e;
  var c;
  var s;
  var a;
  var h = {};
  var p = [];
  var v = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  var y = Array.isArray;
  function d(n2, l4) {
    for (var u4 in l4) n2[u4] = l4[u4];
    return n2;
  }
  function w(n2) {
    var l4 = n2.parentNode;
    l4 && l4.removeChild(n2);
  }
  function _(l4, u4, t3) {
    var i4, o3, r3, f4 = {};
    for (r3 in u4) "key" == r3 ? i4 = u4[r3] : "ref" == r3 ? o3 = u4[r3] : f4[r3] = u4[r3];
    if (arguments.length > 2 && (f4.children = arguments.length > 3 ? n.call(arguments, 2) : t3), "function" == typeof l4 && null != l4.defaultProps) for (r3 in l4.defaultProps) void 0 === f4[r3] && (f4[r3] = l4.defaultProps[r3]);
    return g(l4, f4, i4, o3, null);
  }
  function g(n2, t3, i4, o3, r3) {
    var f4 = { type: n2, props: t3, key: i4, ref: o3, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: null == r3 ? ++u : r3, __i: -1, __u: 0 };
    return null == r3 && null != l.vnode && l.vnode(f4), f4;
  }
  function m() {
    return { current: null };
  }
  function k(n2) {
    return n2.children;
  }
  function b(n2, l4) {
    this.props = n2, this.context = l4;
  }
  function x(n2, l4) {
    if (null == l4) return n2.__ ? x(n2.__, n2.__i + 1) : null;
    for (var u4; l4 < n2.__k.length; l4++) if (null != (u4 = n2.__k[l4]) && null != u4.__e) return u4.__e;
    return "function" == typeof n2.type ? x(n2) : null;
  }
  function C(n2) {
    var l4, u4;
    if (null != (n2 = n2.__) && null != n2.__c) {
      for (n2.__e = n2.__c.base = null, l4 = 0; l4 < n2.__k.length; l4++) if (null != (u4 = n2.__k[l4]) && null != u4.__e) {
        n2.__e = n2.__c.base = u4.__e;
        break;
      }
      return C(n2);
    }
  }
  function M(n2) {
    (!n2.__d && (n2.__d = true) && i.push(n2) && !P.__r++ || o !== l.debounceRendering) && ((o = l.debounceRendering) || r)(P);
  }
  function P() {
    var n2, u4, t3, o3, r3, e3, c3, s3;
    for (i.sort(f); n2 = i.shift(); ) n2.__d && (u4 = i.length, o3 = void 0, e3 = (r3 = (t3 = n2).__v).__e, c3 = [], s3 = [], t3.__P && ((o3 = d({}, r3)).__v = r3.__v + 1, l.vnode && l.vnode(o3), O(t3.__P, o3, r3, t3.__n, t3.__P.namespaceURI, 32 & r3.__u ? [e3] : null, c3, null == e3 ? x(r3) : e3, !!(32 & r3.__u), s3), o3.__v = r3.__v, o3.__.__k[o3.__i] = o3, j(c3, o3, s3), o3.__e != e3 && C(o3)), i.length > u4 && i.sort(f));
    P.__r = 0;
  }
  function S(n2, l4, u4, t3, i4, o3, r3, f4, e3, c3, s3) {
    var a3, v3, y3, d4, w5, _4 = t3 && t3.__k || p, g5 = l4.length;
    for (u4.__d = e3, $(u4, l4, _4), e3 = u4.__d, a3 = 0; a3 < g5; a3++) null != (y3 = u4.__k[a3]) && "boolean" != typeof y3 && "function" != typeof y3 && (v3 = -1 === y3.__i ? h : _4[y3.__i] || h, y3.__i = a3, O(n2, y3, v3, i4, o3, r3, f4, e3, c3, s3), d4 = y3.__e, y3.ref && v3.ref != y3.ref && (v3.ref && N(v3.ref, null, y3), s3.push(y3.ref, y3.__c || d4, y3)), null == w5 && null != d4 && (w5 = d4), 65536 & y3.__u || v3.__k === y3.__k ? (e3 && !e3.isConnected && (e3 = x(v3)), e3 = I(y3, e3, n2)) : "function" == typeof y3.type && void 0 !== y3.__d ? e3 = y3.__d : d4 && (e3 = d4.nextSibling), y3.__d = void 0, y3.__u &= -196609);
    u4.__d = e3, u4.__e = w5;
  }
  function $(n2, l4, u4) {
    var t3, i4, o3, r3, f4, e3 = l4.length, c3 = u4.length, s3 = c3, a3 = 0;
    for (n2.__k = [], t3 = 0; t3 < e3; t3++) r3 = t3 + a3, null != (i4 = n2.__k[t3] = null == (i4 = l4[t3]) || "boolean" == typeof i4 || "function" == typeof i4 ? null : "string" == typeof i4 || "number" == typeof i4 || "bigint" == typeof i4 || i4.constructor == String ? g(null, i4, null, null, null) : y(i4) ? g(k, { children: i4 }, null, null, null) : void 0 === i4.constructor && i4.__b > 0 ? g(i4.type, i4.props, i4.key, i4.ref ? i4.ref : null, i4.__v) : i4) ? (i4.__ = n2, i4.__b = n2.__b + 1, f4 = L(i4, u4, r3, s3), i4.__i = f4, o3 = null, -1 !== f4 && (s3--, (o3 = u4[f4]) && (o3.__u |= 131072)), null == o3 || null === o3.__v ? (-1 == f4 && a3--, "function" != typeof i4.type && (i4.__u |= 65536)) : f4 !== r3 && (f4 === r3 + 1 ? a3++ : f4 > r3 ? s3 > e3 - r3 ? a3 += f4 - r3 : a3-- : f4 < r3 ? f4 == r3 - 1 && (a3 = f4 - r3) : a3 = 0, f4 !== t3 + a3 && (i4.__u |= 65536))) : (o3 = u4[r3]) && null == o3.key && o3.__e && 0 == (131072 & o3.__u) && (o3.__e == n2.__d && (n2.__d = x(o3)), V(o3, o3, false), u4[r3] = null, s3--);
    if (s3) for (t3 = 0; t3 < c3; t3++) null != (o3 = u4[t3]) && 0 == (131072 & o3.__u) && (o3.__e == n2.__d && (n2.__d = x(o3)), V(o3, o3));
  }
  function I(n2, l4, u4) {
    var t3, i4;
    if ("function" == typeof n2.type) {
      for (t3 = n2.__k, i4 = 0; t3 && i4 < t3.length; i4++) t3[i4] && (t3[i4].__ = n2, l4 = I(t3[i4], l4, u4));
      return l4;
    }
    n2.__e != l4 && (u4.insertBefore(n2.__e, l4 || null), l4 = n2.__e);
    do {
      l4 = l4 && l4.nextSibling;
    } while (null != l4 && 8 === l4.nodeType);
    return l4;
  }
  function H(n2, l4) {
    return l4 = l4 || [], null == n2 || "boolean" == typeof n2 || (y(n2) ? n2.some(function(n3) {
      H(n3, l4);
    }) : l4.push(n2)), l4;
  }
  function L(n2, l4, u4, t3) {
    var i4 = n2.key, o3 = n2.type, r3 = u4 - 1, f4 = u4 + 1, e3 = l4[u4];
    if (null === e3 || e3 && i4 == e3.key && o3 === e3.type && 0 == (131072 & e3.__u)) return u4;
    if (t3 > (null != e3 && 0 == (131072 & e3.__u) ? 1 : 0)) for (; r3 >= 0 || f4 < l4.length; ) {
      if (r3 >= 0) {
        if ((e3 = l4[r3]) && 0 == (131072 & e3.__u) && i4 == e3.key && o3 === e3.type) return r3;
        r3--;
      }
      if (f4 < l4.length) {
        if ((e3 = l4[f4]) && 0 == (131072 & e3.__u) && i4 == e3.key && o3 === e3.type) return f4;
        f4++;
      }
    }
    return -1;
  }
  function T(n2, l4, u4) {
    "-" === l4[0] ? n2.setProperty(l4, null == u4 ? "" : u4) : n2[l4] = null == u4 ? "" : "number" != typeof u4 || v.test(l4) ? u4 : u4 + "px";
  }
  function A(n2, l4, u4, t3, i4) {
    var o3;
    n: if ("style" === l4) if ("string" == typeof u4) n2.style.cssText = u4;
    else {
      if ("string" == typeof t3 && (n2.style.cssText = t3 = ""), t3) for (l4 in t3) u4 && l4 in u4 || T(n2.style, l4, "");
      if (u4) for (l4 in u4) t3 && u4[l4] === t3[l4] || T(n2.style, l4, u4[l4]);
    }
    else if ("o" === l4[0] && "n" === l4[1]) o3 = l4 !== (l4 = l4.replace(/(PointerCapture)$|Capture$/i, "$1")), l4 = l4.toLowerCase() in n2 || "onFocusOut" === l4 || "onFocusIn" === l4 ? l4.toLowerCase().slice(2) : l4.slice(2), n2.l || (n2.l = {}), n2.l[l4 + o3] = u4, u4 ? t3 ? u4.u = t3.u : (u4.u = e, n2.addEventListener(l4, o3 ? s : c, o3)) : n2.removeEventListener(l4, o3 ? s : c, o3);
    else {
      if ("http://www.w3.org/2000/svg" == i4) l4 = l4.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" != l4 && "height" != l4 && "href" != l4 && "list" != l4 && "form" != l4 && "tabIndex" != l4 && "download" != l4 && "rowSpan" != l4 && "colSpan" != l4 && "role" != l4 && l4 in n2) try {
        n2[l4] = null == u4 ? "" : u4;
        break n;
      } catch (n3) {
      }
      "function" == typeof u4 || (null == u4 || false === u4 && "-" !== l4[4] ? n2.removeAttribute(l4) : n2.setAttribute(l4, u4));
    }
  }
  function F(n2) {
    return function(u4) {
      if (this.l) {
        var t3 = this.l[u4.type + n2];
        if (null == u4.t) u4.t = e++;
        else if (u4.t < t3.u) return;
        return t3(l.event ? l.event(u4) : u4);
      }
    };
  }
  function O(n2, u4, t3, i4, o3, r3, f4, e3, c3, s3) {
    var a3, h4, p4, v3, w5, _4, g5, m3, x4, C5, M3, P4, $4, I2, H3, L3 = u4.type;
    if (void 0 !== u4.constructor) return null;
    128 & t3.__u && (c3 = !!(32 & t3.__u), r3 = [e3 = u4.__e = t3.__e]), (a3 = l.__b) && a3(u4);
    n: if ("function" == typeof L3) try {
      if (m3 = u4.props, x4 = (a3 = L3.contextType) && i4[a3.__c], C5 = a3 ? x4 ? x4.props.value : a3.__ : i4, t3.__c ? g5 = (h4 = u4.__c = t3.__c).__ = h4.__E : ("prototype" in L3 && L3.prototype.render ? u4.__c = h4 = new L3(m3, C5) : (u4.__c = h4 = new b(m3, C5), h4.constructor = L3, h4.render = q), x4 && x4.sub(h4), h4.props = m3, h4.state || (h4.state = {}), h4.context = C5, h4.__n = i4, p4 = h4.__d = true, h4.__h = [], h4._sb = []), null == h4.__s && (h4.__s = h4.state), null != L3.getDerivedStateFromProps && (h4.__s == h4.state && (h4.__s = d({}, h4.__s)), d(h4.__s, L3.getDerivedStateFromProps(m3, h4.__s))), v3 = h4.props, w5 = h4.state, h4.__v = u4, p4) null == L3.getDerivedStateFromProps && null != h4.componentWillMount && h4.componentWillMount(), null != h4.componentDidMount && h4.__h.push(h4.componentDidMount);
      else {
        if (null == L3.getDerivedStateFromProps && m3 !== v3 && null != h4.componentWillReceiveProps && h4.componentWillReceiveProps(m3, C5), !h4.__e && (null != h4.shouldComponentUpdate && false === h4.shouldComponentUpdate(m3, h4.__s, C5) || u4.__v === t3.__v)) {
          for (u4.__v !== t3.__v && (h4.props = m3, h4.state = h4.__s, h4.__d = false), u4.__e = t3.__e, u4.__k = t3.__k, u4.__k.forEach(function(n3) {
            n3 && (n3.__ = u4);
          }), M3 = 0; M3 < h4._sb.length; M3++) h4.__h.push(h4._sb[M3]);
          h4._sb = [], h4.__h.length && f4.push(h4);
          break n;
        }
        null != h4.componentWillUpdate && h4.componentWillUpdate(m3, h4.__s, C5), null != h4.componentDidUpdate && h4.__h.push(function() {
          h4.componentDidUpdate(v3, w5, _4);
        });
      }
      if (h4.context = C5, h4.props = m3, h4.__P = n2, h4.__e = false, P4 = l.__r, $4 = 0, "prototype" in L3 && L3.prototype.render) {
        for (h4.state = h4.__s, h4.__d = false, P4 && P4(u4), a3 = h4.render(h4.props, h4.state, h4.context), I2 = 0; I2 < h4._sb.length; I2++) h4.__h.push(h4._sb[I2]);
        h4._sb = [];
      } else do {
        h4.__d = false, P4 && P4(u4), a3 = h4.render(h4.props, h4.state, h4.context), h4.state = h4.__s;
      } while (h4.__d && ++$4 < 25);
      h4.state = h4.__s, null != h4.getChildContext && (i4 = d(d({}, i4), h4.getChildContext())), p4 || null == h4.getSnapshotBeforeUpdate || (_4 = h4.getSnapshotBeforeUpdate(v3, w5)), S(n2, y(H3 = null != a3 && a3.type === k && null == a3.key ? a3.props.children : a3) ? H3 : [H3], u4, t3, i4, o3, r3, f4, e3, c3, s3), h4.base = u4.__e, u4.__u &= -161, h4.__h.length && f4.push(h4), g5 && (h4.__E = h4.__ = null);
    } catch (n3) {
      u4.__v = null, c3 || null != r3 ? (u4.__e = e3, u4.__u |= c3 ? 160 : 32, r3[r3.indexOf(e3)] = null) : (u4.__e = t3.__e, u4.__k = t3.__k), l.__e(n3, u4, t3);
    }
    else null == r3 && u4.__v === t3.__v ? (u4.__k = t3.__k, u4.__e = t3.__e) : u4.__e = z(t3.__e, u4, t3, i4, o3, r3, f4, c3, s3);
    (a3 = l.diffed) && a3(u4);
  }
  function j(n2, u4, t3) {
    u4.__d = void 0;
    for (var i4 = 0; i4 < t3.length; i4++) N(t3[i4], t3[++i4], t3[++i4]);
    l.__c && l.__c(u4, n2), n2.some(function(u5) {
      try {
        n2 = u5.__h, u5.__h = [], n2.some(function(n3) {
          n3.call(u5);
        });
      } catch (n3) {
        l.__e(n3, u5.__v);
      }
    });
  }
  function z(l4, u4, t3, i4, o3, r3, f4, e3, c3) {
    var s3, a3, p4, v3, d4, _4, g5, m3 = t3.props, k3 = u4.props, b2 = u4.type;
    if ("svg" === b2 ? o3 = "http://www.w3.org/2000/svg" : "math" === b2 ? o3 = "http://www.w3.org/1998/Math/MathML" : o3 || (o3 = "http://www.w3.org/1999/xhtml"), null != r3) {
      for (s3 = 0; s3 < r3.length; s3++) if ((d4 = r3[s3]) && "setAttribute" in d4 == !!b2 && (b2 ? d4.localName === b2 : 3 === d4.nodeType)) {
        l4 = d4, r3[s3] = null;
        break;
      }
    }
    if (null == l4) {
      if (null === b2) return document.createTextNode(k3);
      l4 = document.createElementNS(o3, b2, k3.is && k3), r3 = null, e3 = false;
    }
    if (null === b2) m3 === k3 || e3 && l4.data === k3 || (l4.data = k3);
    else {
      if (r3 = r3 && n.call(l4.childNodes), m3 = t3.props || h, !e3 && null != r3) for (m3 = {}, s3 = 0; s3 < l4.attributes.length; s3++) m3[(d4 = l4.attributes[s3]).name] = d4.value;
      for (s3 in m3) if (d4 = m3[s3], "children" == s3) ;
      else if ("dangerouslySetInnerHTML" == s3) p4 = d4;
      else if ("key" !== s3 && !(s3 in k3)) {
        if ("value" == s3 && "defaultValue" in k3 || "checked" == s3 && "defaultChecked" in k3) continue;
        A(l4, s3, null, d4, o3);
      }
      for (s3 in k3) d4 = k3[s3], "children" == s3 ? v3 = d4 : "dangerouslySetInnerHTML" == s3 ? a3 = d4 : "value" == s3 ? _4 = d4 : "checked" == s3 ? g5 = d4 : "key" === s3 || e3 && "function" != typeof d4 || m3[s3] === d4 || A(l4, s3, d4, m3[s3], o3);
      if (a3) e3 || p4 && (a3.__html === p4.__html || a3.__html === l4.innerHTML) || (l4.innerHTML = a3.__html), u4.__k = [];
      else if (p4 && (l4.innerHTML = ""), S(l4, y(v3) ? v3 : [v3], u4, t3, i4, "foreignObject" === b2 ? "http://www.w3.org/1999/xhtml" : o3, r3, f4, r3 ? r3[0] : t3.__k && x(t3, 0), e3, c3), null != r3) for (s3 = r3.length; s3--; ) null != r3[s3] && w(r3[s3]);
      e3 || (s3 = "value", void 0 !== _4 && (_4 !== l4[s3] || "progress" === b2 && !_4 || "option" === b2 && _4 !== m3[s3]) && A(l4, s3, _4, m3[s3], o3), s3 = "checked", void 0 !== g5 && g5 !== l4[s3] && A(l4, s3, g5, m3[s3], o3));
    }
    return l4;
  }
  function N(n2, u4, t3) {
    try {
      "function" == typeof n2 ? n2(u4) : n2.current = u4;
    } catch (n3) {
      l.__e(n3, t3);
    }
  }
  function V(n2, u4, t3) {
    var i4, o3;
    if (l.unmount && l.unmount(n2), (i4 = n2.ref) && (i4.current && i4.current !== n2.__e || N(i4, null, u4)), null != (i4 = n2.__c)) {
      if (i4.componentWillUnmount) try {
        i4.componentWillUnmount();
      } catch (n3) {
        l.__e(n3, u4);
      }
      i4.base = i4.__P = null;
    }
    if (i4 = n2.__k) for (o3 = 0; o3 < i4.length; o3++) i4[o3] && V(i4[o3], u4, t3 || "function" != typeof n2.type);
    t3 || null == n2.__e || w(n2.__e), n2.__c = n2.__ = n2.__e = n2.__d = void 0;
  }
  function q(n2, l4, u4) {
    return this.constructor(n2, u4);
  }
  function B(u4, t3, i4) {
    var o3, r3, f4, e3;
    l.__ && l.__(u4, t3), r3 = (o3 = "function" == typeof i4) ? null : i4 && i4.__k || t3.__k, f4 = [], e3 = [], O(t3, u4 = (!o3 && i4 || t3).__k = _(k, null, [u4]), r3 || h, h, t3.namespaceURI, !o3 && i4 ? [i4] : r3 ? null : t3.firstChild ? n.call(t3.childNodes) : null, f4, !o3 && i4 ? i4 : r3 ? r3.__e : t3.firstChild, o3, e3), j(f4, u4, e3);
  }
  function D(n2, l4) {
    B(n2, l4, D);
  }
  function E(l4, u4, t3) {
    var i4, o3, r3, f4, e3 = d({}, l4.props);
    for (r3 in l4.type && l4.type.defaultProps && (f4 = l4.type.defaultProps), u4) "key" == r3 ? i4 = u4[r3] : "ref" == r3 ? o3 = u4[r3] : e3[r3] = void 0 === u4[r3] && void 0 !== f4 ? f4[r3] : u4[r3];
    return arguments.length > 2 && (e3.children = arguments.length > 3 ? n.call(arguments, 2) : t3), g(l4.type, e3, i4 || l4.key, o3 || l4.ref, null);
  }
  function G(n2, l4) {
    var u4 = { __c: l4 = "__cC" + a++, __: n2, Consumer: function(n3, l5) {
      return n3.children(l5);
    }, Provider: function(n3) {
      var u5, t3;
      return this.getChildContext || (u5 = [], (t3 = {})[l4] = this, this.getChildContext = function() {
        return t3;
      }, this.shouldComponentUpdate = function(n4) {
        this.props.value !== n4.value && u5.some(function(n5) {
          n5.__e = true, M(n5);
        });
      }, this.sub = function(n4) {
        u5.push(n4);
        var l5 = n4.componentWillUnmount;
        n4.componentWillUnmount = function() {
          u5.splice(u5.indexOf(n4), 1), l5 && l5.call(n4);
        };
      }), n3.children;
    } };
    return u4.Provider.__ = u4.Consumer.contextType = u4;
  }
  n = p.slice, l = { __e: function(n2, l4, u4, t3) {
    for (var i4, o3, r3; l4 = l4.__; ) if ((i4 = l4.__c) && !i4.__) try {
      if ((o3 = i4.constructor) && null != o3.getDerivedStateFromError && (i4.setState(o3.getDerivedStateFromError(n2)), r3 = i4.__d), null != i4.componentDidCatch && (i4.componentDidCatch(n2, t3 || {}), r3 = i4.__d), r3) return i4.__E = i4;
    } catch (l5) {
      n2 = l5;
    }
    throw n2;
  } }, u = 0, t = function(n2) {
    return null != n2 && null == n2.constructor;
  }, b.prototype.setState = function(n2, l4) {
    var u4;
    u4 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = d({}, this.state), "function" == typeof n2 && (n2 = n2(d({}, u4), this.props)), n2 && d(u4, n2), null != n2 && this.__v && (l4 && this._sb.push(l4), M(this));
  }, b.prototype.forceUpdate = function(n2) {
    this.__v && (this.__e = true, n2 && this.__h.push(n2), M(this));
  }, b.prototype.render = k, i = [], r = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, f = function(n2, l4) {
    return n2.__v.__b - l4.__v.__b;
  }, P.__r = 0, e = 0, c = F(false), s = F(true), a = 0;

  // node_modules/preact/hooks/dist/hooks.module.js
  var t2;
  var r2;
  var u2;
  var i2;
  var o2 = 0;
  var f2 = [];
  var c2 = [];
  var e2 = l;
  var a2 = e2.__b;
  var v2 = e2.__r;
  var l2 = e2.diffed;
  var m2 = e2.__c;
  var s2 = e2.unmount;
  var d2 = e2.__;
  function h2(n2, t3) {
    e2.__h && e2.__h(r2, n2, o2 || t3), o2 = 0;
    var u4 = r2.__H || (r2.__H = { __: [], __h: [] });
    return n2 >= u4.__.length && u4.__.push({ __V: c2 }), u4.__[n2];
  }
  function p2(n2) {
    return o2 = 1, y2(D2, n2);
  }
  function y2(n2, u4, i4) {
    var o3 = h2(t2++, 2);
    if (o3.t = n2, !o3.__c && (o3.__ = [i4 ? i4(u4) : D2(void 0, u4), function(n3) {
      var t3 = o3.__N ? o3.__N[0] : o3.__[0], r3 = o3.t(t3, n3);
      t3 !== r3 && (o3.__N = [r3, o3.__[1]], o3.__c.setState({}));
    }], o3.__c = r2, !r2.u)) {
      var f4 = function(n3, t3, r3) {
        if (!o3.__c.__H) return true;
        var u5 = o3.__c.__H.__.filter(function(n4) {
          return !!n4.__c;
        });
        if (u5.every(function(n4) {
          return !n4.__N;
        })) return !c3 || c3.call(this, n3, t3, r3);
        var i5 = false;
        return u5.forEach(function(n4) {
          if (n4.__N) {
            var t4 = n4.__[0];
            n4.__ = n4.__N, n4.__N = void 0, t4 !== n4.__[0] && (i5 = true);
          }
        }), !(!i5 && o3.__c.props === n3) && (!c3 || c3.call(this, n3, t3, r3));
      };
      r2.u = true;
      var c3 = r2.shouldComponentUpdate, e3 = r2.componentWillUpdate;
      r2.componentWillUpdate = function(n3, t3, r3) {
        if (this.__e) {
          var u5 = c3;
          c3 = void 0, f4(n3, t3, r3), c3 = u5;
        }
        e3 && e3.call(this, n3, t3, r3);
      }, r2.shouldComponentUpdate = f4;
    }
    return o3.__N || o3.__;
  }
  function _2(n2, u4) {
    var i4 = h2(t2++, 3);
    !e2.__s && C2(i4.__H, u4) && (i4.__ = n2, i4.i = u4, r2.__H.__h.push(i4));
  }
  function F2(n2) {
    return o2 = 5, q2(function() {
      return { current: n2 };
    }, []);
  }
  function q2(n2, r3) {
    var u4 = h2(t2++, 7);
    return C2(u4.__H, r3) ? (u4.__V = n2(), u4.i = r3, u4.__h = n2, u4.__V) : u4.__;
  }
  function j2() {
    for (var n2; n2 = f2.shift(); ) if (n2.__P && n2.__H) try {
      n2.__H.__h.forEach(z2), n2.__H.__h.forEach(B2), n2.__H.__h = [];
    } catch (t3) {
      n2.__H.__h = [], e2.__e(t3, n2.__v);
    }
  }
  e2.__b = function(n2) {
    r2 = null, a2 && a2(n2);
  }, e2.__ = function(n2, t3) {
    n2 && t3.__k && t3.__k.__m && (n2.__m = t3.__k.__m), d2 && d2(n2, t3);
  }, e2.__r = function(n2) {
    v2 && v2(n2), t2 = 0;
    var i4 = (r2 = n2.__c).__H;
    i4 && (u2 === r2 ? (i4.__h = [], r2.__h = [], i4.__.forEach(function(n3) {
      n3.__N && (n3.__ = n3.__N), n3.__V = c2, n3.__N = n3.i = void 0;
    })) : (i4.__h.forEach(z2), i4.__h.forEach(B2), i4.__h = [], t2 = 0)), u2 = r2;
  }, e2.diffed = function(n2) {
    l2 && l2(n2);
    var t3 = n2.__c;
    t3 && t3.__H && (t3.__H.__h.length && (1 !== f2.push(t3) && i2 === e2.requestAnimationFrame || ((i2 = e2.requestAnimationFrame) || w2)(j2)), t3.__H.__.forEach(function(n3) {
      n3.i && (n3.__H = n3.i), n3.__V !== c2 && (n3.__ = n3.__V), n3.i = void 0, n3.__V = c2;
    })), u2 = r2 = null;
  }, e2.__c = function(n2, t3) {
    t3.some(function(n3) {
      try {
        n3.__h.forEach(z2), n3.__h = n3.__h.filter(function(n4) {
          return !n4.__ || B2(n4);
        });
      } catch (r3) {
        t3.some(function(n4) {
          n4.__h && (n4.__h = []);
        }), t3 = [], e2.__e(r3, n3.__v);
      }
    }), m2 && m2(n2, t3);
  }, e2.unmount = function(n2) {
    s2 && s2(n2);
    var t3, r3 = n2.__c;
    r3 && r3.__H && (r3.__H.__.forEach(function(n3) {
      try {
        z2(n3);
      } catch (n4) {
        t3 = n4;
      }
    }), r3.__H = void 0, t3 && e2.__e(t3, r3.__v));
  };
  var k2 = "function" == typeof requestAnimationFrame;
  function w2(n2) {
    var t3, r3 = function() {
      clearTimeout(u4), k2 && cancelAnimationFrame(t3), setTimeout(n2);
    }, u4 = setTimeout(r3, 100);
    k2 && (t3 = requestAnimationFrame(r3));
  }
  function z2(n2) {
    var t3 = r2, u4 = n2.__c;
    "function" == typeof u4 && (n2.__c = void 0, u4()), r2 = t3;
  }
  function B2(n2) {
    var t3 = r2;
    n2.__c = n2.__(), r2 = t3;
  }
  function C2(n2, t3) {
    return !n2 || n2.length !== t3.length || t3.some(function(t4, r3) {
      return t4 !== n2[r3];
    });
  }
  function D2(n2, t3) {
    return "function" == typeof t3 ? t3(n2) : t3;
  }

  // node_modules/preact/compat/dist/compat.module.js
  function g3(n2, t3) {
    for (var e3 in t3) n2[e3] = t3[e3];
    return n2;
  }
  function E2(n2, t3) {
    for (var e3 in n2) if ("__source" !== e3 && !(e3 in t3)) return true;
    for (var r3 in t3) if ("__source" !== r3 && n2[r3] !== t3[r3]) return true;
    return false;
  }
  function C3(n2, t3) {
    this.props = n2, this.context = t3;
  }
  (C3.prototype = new b()).isPureReactComponent = true, C3.prototype.shouldComponentUpdate = function(n2, t3) {
    return E2(this.props, n2) || E2(this.state, t3);
  };
  var R = l.__b;
  l.__b = function(n2) {
    n2.type && n2.type.__f && n2.ref && (n2.props.ref = n2.ref, n2.ref = null), R && R(n2);
  };
  var w3 = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
  var M2 = l.__e;
  l.__e = function(n2, t3, e3, r3) {
    if (n2.then) {
      for (var u4, o3 = t3; o3 = o3.__; ) if ((u4 = o3.__c) && u4.__c) return null == t3.__e && (t3.__e = e3.__e, t3.__k = e3.__k), u4.__c(n2, t3);
    }
    M2(n2, t3, e3, r3);
  };
  var T3 = l.unmount;
  function A3(n2, t3, e3) {
    return n2 && (n2.__c && n2.__c.__H && (n2.__c.__H.__.forEach(function(n3) {
      "function" == typeof n3.__c && n3.__c();
    }), n2.__c.__H = null), null != (n2 = g3({}, n2)).__c && (n2.__c.__P === e3 && (n2.__c.__P = t3), n2.__c = null), n2.__k = n2.__k && n2.__k.map(function(n3) {
      return A3(n3, t3, e3);
    })), n2;
  }
  function D3(n2, t3, e3) {
    return n2 && e3 && (n2.__v = null, n2.__k = n2.__k && n2.__k.map(function(n3) {
      return D3(n3, t3, e3);
    }), n2.__c && n2.__c.__P === t3 && (n2.__e && e3.appendChild(n2.__e), n2.__c.__e = true, n2.__c.__P = e3)), n2;
  }
  function L2() {
    this.__u = 0, this.t = null, this.__b = null;
  }
  function O2(n2) {
    var t3 = n2.__.__c;
    return t3 && t3.__a && t3.__a(n2);
  }
  function U() {
    this.u = null, this.o = null;
  }
  l.unmount = function(n2) {
    var t3 = n2.__c;
    t3 && t3.__R && t3.__R(), t3 && 32 & n2.__u && (n2.type = null), T3 && T3(n2);
  }, (L2.prototype = new b()).__c = function(n2, t3) {
    var e3 = t3.__c, r3 = this;
    null == r3.t && (r3.t = []), r3.t.push(e3);
    var u4 = O2(r3.__v), o3 = false, i4 = function() {
      o3 || (o3 = true, e3.__R = null, u4 ? u4(l4) : l4());
    };
    e3.__R = i4;
    var l4 = function() {
      if (!--r3.__u) {
        if (r3.state.__a) {
          var n3 = r3.state.__a;
          r3.__v.__k[0] = D3(n3, n3.__c.__P, n3.__c.__O);
        }
        var t4;
        for (r3.setState({ __a: r3.__b = null }); t4 = r3.t.pop(); ) t4.forceUpdate();
      }
    };
    r3.__u++ || 32 & t3.__u || r3.setState({ __a: r3.__b = r3.__v.__k[0] }), n2.then(i4, i4);
  }, L2.prototype.componentWillUnmount = function() {
    this.t = [];
  }, L2.prototype.render = function(n2, e3) {
    if (this.__b) {
      if (this.__v.__k) {
        var r3 = document.createElement("div"), o3 = this.__v.__k[0].__c;
        this.__v.__k[0] = A3(this.__b, r3, o3.__O = o3.__P);
      }
      this.__b = null;
    }
    var i4 = e3.__a && _(k, null, n2.fallback);
    return i4 && (i4.__u &= -33), [_(k, null, e3.__a ? null : n2.children), i4];
  };
  var V3 = function(n2, t3, e3) {
    if (++e3[1] === e3[0] && n2.o.delete(t3), n2.props.revealOrder && ("t" !== n2.props.revealOrder[0] || !n2.o.size)) for (e3 = n2.u; e3; ) {
      for (; e3.length > 3; ) e3.pop()();
      if (e3[1] < e3[0]) break;
      n2.u = e3 = e3[2];
    }
  };
  (U.prototype = new b()).__a = function(n2) {
    var t3 = this, e3 = O2(t3.__v), r3 = t3.o.get(n2);
    return r3[0]++, function(u4) {
      var o3 = function() {
        t3.props.revealOrder ? (r3.push(u4), V3(t3, n2, r3)) : u4();
      };
      e3 ? e3(o3) : o3();
    };
  }, U.prototype.render = function(n2) {
    this.u = null, this.o = /* @__PURE__ */ new Map();
    var t3 = H(n2.children);
    n2.revealOrder && "b" === n2.revealOrder[0] && t3.reverse();
    for (var e3 = t3.length; e3--; ) this.o.set(t3[e3], this.u = [1, 0, this.u]);
    return n2.children;
  }, U.prototype.componentDidUpdate = U.prototype.componentDidMount = function() {
    var n2 = this;
    this.o.forEach(function(t3, e3) {
      V3(n2, e3, t3);
    });
  };
  var z3 = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
  var B3 = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
  var H2 = /^on(Ani|Tra|Tou|BeforeInp|Compo)/;
  var Z = /[A-Z0-9]/g;
  var Y = "undefined" != typeof document;
  var $2 = function(n2) {
    return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/ : /fil|che|ra/).test(n2);
  };
  b.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t3) {
    Object.defineProperty(b.prototype, t3, { configurable: true, get: function() {
      return this["UNSAFE_" + t3];
    }, set: function(n2) {
      Object.defineProperty(this, t3, { configurable: true, writable: true, value: n2 });
    } });
  });
  var J = l.event;
  function K() {
  }
  function Q() {
    return this.cancelBubble;
  }
  function X() {
    return this.defaultPrevented;
  }
  l.event = function(n2) {
    return J && (n2 = J(n2)), n2.persist = K, n2.isPropagationStopped = Q, n2.isDefaultPrevented = X, n2.nativeEvent = n2;
  };
  var nn;
  var tn = { enumerable: false, configurable: true, get: function() {
    return this.class;
  } };
  var en = l.vnode;
  l.vnode = function(n2) {
    "string" == typeof n2.type && function(n3) {
      var t3 = n3.props, e3 = n3.type, u4 = {};
      for (var o3 in t3) {
        var i4 = t3[o3];
        if (!("value" === o3 && "defaultValue" in t3 && null == i4 || Y && "children" === o3 && "noscript" === e3 || "class" === o3 || "className" === o3)) {
          var l4 = o3.toLowerCase();
          "defaultValue" === o3 && "value" in t3 && null == t3.value ? o3 = "value" : "download" === o3 && true === i4 ? i4 = "" : "translate" === l4 && "no" === i4 ? i4 = false : "ondoubleclick" === l4 ? o3 = "ondblclick" : "onchange" !== l4 || "input" !== e3 && "textarea" !== e3 || $2(t3.type) ? "onfocus" === l4 ? o3 = "onfocusin" : "onblur" === l4 ? o3 = "onfocusout" : H2.test(o3) ? o3 = l4 : -1 === e3.indexOf("-") && B3.test(o3) ? o3 = o3.replace(Z, "-$&").toLowerCase() : null === i4 && (i4 = void 0) : l4 = o3 = "oninput", "oninput" === l4 && u4[o3 = l4] && (o3 = "oninputCapture"), u4[o3] = i4;
        }
      }
      "select" == e3 && u4.multiple && Array.isArray(u4.value) && (u4.value = H(t3.children).forEach(function(n4) {
        n4.props.selected = -1 != u4.value.indexOf(n4.props.value);
      })), "select" == e3 && null != u4.defaultValue && (u4.value = H(t3.children).forEach(function(n4) {
        n4.props.selected = u4.multiple ? -1 != u4.defaultValue.indexOf(n4.props.value) : u4.defaultValue == n4.props.value;
      })), t3.class && !t3.className ? (u4.class = t3.class, Object.defineProperty(u4, "className", tn)) : (t3.className && !t3.class || t3.class && t3.className) && (u4.class = u4.className = t3.className), n3.props = u4;
    }(n2), n2.$$typeof = z3, en && en(n2);
  };
  var rn = l.__r;
  l.__r = function(n2) {
    rn && rn(n2), nn = n2.__c;
  };
  var un = l.diffed;
  l.diffed = function(n2) {
    un && un(n2);
    var t3 = n2.props, e3 = n2.__e;
    null != e3 && "textarea" === n2.type && "value" in t3 && t3.value !== e3.value && (e3.value = null == t3.value ? "" : t3.value), nn = null;
  };

  // web-player/web-player.module.css
  var web_player_default = {
    button: "web_player_button",
    floatingButton: "web_player_floatingButton",
    hasImage: "web_player_hasImage",
    spinner: "web_player_spinner",
    left: "web_player_left",
    right: "web_player_right",
    container: "web_player_container",
    "container-hide": "web_player_container-hide",
    playPanel: "web_player_playPanel",
    open: "web_player_open",
    nowPlaying: "web_player_nowPlaying",
    metadataTitle: "web_player_metadataTitle",
    metadataAlbum: "web_player_metadataAlbum",
    playbackButtons: "web_player_playbackButtons",
    playbackControlButton: "web_player_playbackControlButton",
    playPauseBtn: "web_player_playPauseBtn",
    playing: "web_player_playing",
    loading: "web_player_loading",
    playheadContainer: "web_player_playheadContainer",
    playheadControl: "web_player_playheadControl",
    playlistToggleButton: "web_player_playlistToggleButton",
    playlistPanel: "web_player_playlistPanel",
    "playlist-panel-show": "web_player_playlist-panel-show",
    closing: "web_player_closing",
    "playlist-panel-hide": "web_player_playlist-panel-hide",
    playlistItems: "web_player_playlistItems",
    playlistTitle: "web_player_playlistTitle",
    playlistItem: "web_player_playlistItem",
    newItem: "web_player_newItem",
    "playlist-item-add": "web_player_playlist-item-add",
    currentlyPlaying: "web_player_currentlyPlaying",
    playIndicator: "web_player_playIndicator",
    removeBtn: "web_player_removeBtn",
    metadata: "web_player_metadata",
    title: "web_player_title",
    album: "web_player_album",
    playlistEmpty: "web_player_playlistEmpty",
    disabled: "web_player_disabled"
  };

  // node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
  var f3 = 0;
  var i3 = Array.isArray;
  function u3(e3, t3, n2, o3, i4, u4) {
    t3 || (t3 = {});
    var a3, c3, p4 = t3;
    if ("ref" in p4) for (c3 in p4 = {}, t3) "ref" == c3 ? a3 = t3[c3] : p4[c3] = t3[c3];
    var l4 = { type: e3, props: p4, key: n2, ref: a3, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: --f3, __i: -1, __u: 0, __source: i4, __self: u4 };
    if ("function" == typeof e3 && (a3 = e3.defaultProps)) for (c3 in a3) void 0 === p4[c3] && (p4[c3] = a3[c3]);
    return l.vnode && l.vnode(l4), l4;
  }

  // web-player/web-player.tsx
  var audio = new Audio();
  var classes = (classList) => {
    if (Array.isArray(classList)) return classList.join(" ");
    const output = [];
    for (const [key, value] of Object.entries(classList)) {
      if (value) output.push(key);
    }
    return output.join(" ");
  };
  var NowPlaying = ({ nowPlaying, togglePanel }) => {
    const { title, album } = nowPlaying ?? { title: "Nothing is playing right now." };
    return /* @__PURE__ */ u3("div", { onClick: togglePanel, class: web_player_default.nowPlaying, children: [
      /* @__PURE__ */ u3("div", { class: web_player_default.metadataTitle, children: title }),
      /* @__PURE__ */ u3("div", { class: web_player_default.metadataAlbum, children: album })
    ] });
  };
  var PlayButtons = (props) => {
    const classNames = {
      [web_player_default.button]: true,
      [web_player_default.playbackControlButton]: true,
      [web_player_default.disabled]: !props.buttonsEnabled
    };
    return /* @__PURE__ */ u3("div", { class: web_player_default.playbackButtons, children: [
      /* @__PURE__ */ u3("div", { onClick: props.skipBack, class: classes(classNames), children: "\uF049" }),
      /* @__PURE__ */ u3(
        "div",
        {
          onClick: props.playPause,
          class: classes({
            ...classNames,
            [web_player_default.playing]: props.isPlaying && !props.isLoading,
            [web_player_default.loading]: props.isLoading,
            [web_player_default.playPauseBtn]: true
          })
        }
      ),
      /* @__PURE__ */ u3("div", { onClick: props.skipForward, class: classes(classNames), children: "\uF050" })
    ] });
  };
  var Playhead = (props) => {
    const [playheadWidth, setPlayheadWidth] = p2(0);
    _2(() => {
      for (const eventName of ["timeupdate", "ended"]) {
        audio.addEventListener(eventName, () => {
          setPlayheadWidth(100 * audio.currentTime / (audio.duration || 1));
        });
      }
    }, []);
    const classNames = classes({
      [web_player_default.playheadContainer]: true,
      [web_player_default.disabled]: !props.buttonsEnabled
    });
    return /* @__PURE__ */ u3("div", { onClick: props.onClick, class: classNames, children: /* @__PURE__ */ u3("div", { style: { width: `${playheadWidth}%` }, class: web_player_default.playheadControl }) });
  };
  var PlaylistToggle = (props) => {
    const classNames = classes({
      [web_player_default.button]: true,
      [web_player_default.playlistToggleButton]: true,
      [web_player_default.right]: true,
      [web_player_default.open]: props.open
    });
    return /* @__PURE__ */ u3("div", { "data-tooltip": "Open/Close Queue", onClick: props.togglePanel, class: classNames });
  };
  var PlaylistPanel = (props) => {
    const playlistPreviousLength = F2(0);
    _2(() => {
      playlistPreviousLength.current = props.playlist.length;
    }, [props.playlist.length]);
    const items = [];
    for (let i4 = 0; i4 < props.playlist.length; i4++) {
      const { title, album, src } = props.playlist[i4];
      const classNames2 = classes({
        [web_player_default.playlistItem]: true,
        [web_player_default.currentlyPlaying]: props.nowPlayingIndex === i4,
        [web_player_default.newItem]: i4 >= playlistPreviousLength.current
      });
      items.push(
        /* @__PURE__ */ u3("div", { class: classNames2, children: [
          /* @__PURE__ */ u3("div", { class: web_player_default.playIndicator, children: " " }),
          /* @__PURE__ */ u3("div", { class: web_player_default.metadata, onClick: () => props.playSong(i4), children: [
            /* @__PURE__ */ u3("div", { class: web_player_default.title, children: title }),
            /* @__PURE__ */ u3("div", { class: web_player_default.album, children: album })
          ] }),
          /* @__PURE__ */ u3(
            "div",
            {
              class: classes([web_player_default.removeBtn, web_player_default.button]),
              onClick: () => props.removeSong(i4)
            }
          )
        ] }, src)
      );
    }
    if (items.length === 0) {
      items.push(
        /* @__PURE__ */ u3("div", { class: web_player_default.playlistEmpty, children: [
          /* @__PURE__ */ u3("p", { children: /* @__PURE__ */ u3("strong", { children: "There's nothing in the queue." }) }),
          /* @__PURE__ */ u3("p", { children: 'You can play music by clicking "Play" on any music player, or the plus icon to add it to the end of the queue.' })
        ] })
      );
    }
    const classNames = classes({
      [web_player_default.playlistPanel]: true,
      [web_player_default.open]: props.open,
      [web_player_default.closing]: props.closing
    });
    return /* @__PURE__ */ u3("div", { class: classNames, children: [
      /* @__PURE__ */ u3(
        "div",
        {
          class: web_player_default.playlistTitle,
          "data-tooltip": "Click to close queue",
          onClick: props.closePanel,
          children: "Play Queue"
        }
      ),
      /* @__PURE__ */ u3("div", { class: web_player_default.playlistItems, children: items })
    ] });
  };
  var FloatingButton = (props) => {
    const imageSrc = props.nowPlaying?.imageSrc;
    const isRotating = imageSrc && props.isPlaying;
    const style = {
      backgroundImage: isRotating ? `url(${imageSrc})` : null
    };
    const className = classes({
      [web_player_default.button]: true,
      [web_player_default.floatingButton]: true,
      [web_player_default.left]: true,
      [web_player_default.hasImage]: isRotating
    });
    const tooltipText = isRotating ? null : props.playPanelOpen ? "Close Player" : "Open Player";
    return /* @__PURE__ */ u3("div", { "data-tooltip": tooltipText, onClick: props.onClick, class: className, style });
  };
  var setNavigatorPlaybackState = (state) => {
    if (!("mediaSession" in navigator)) return;
    navigator.mediaSession.playbackState = state;
  };
  var setNavigatorPositionState = () => {
    if (!("mediaSession" in navigator)) return;
    navigator.mediaSession.setPositionState({
      duration: audio.duration,
      playbackRate: audio.playbackRate,
      position: audio.currentTime
    });
  };
  var setNavigatorMetadata = (nowPlaying) => {
    if (!("mediaSession" in navigator)) return;
    if (nowPlaying === null) {
      navigator.mediaSession.metadata = null;
      return;
    }
    const metadata = {
      album: nowPlaying.album,
      artist: nowPlaying.artist,
      title: nowPlaying.title
    };
    if (nowPlaying.imageSrc) {
      metadata.artwork = [{ src: nowPlaying.imageSrc }];
    }
    navigator.mediaSession.metadata = new MediaMetadata(metadata);
  };
  var Player = (props) => {
    const [playPanelOpen, setPlayPanelOpen] = p2(false);
    const [playlistPanelOpen, setPlaylistPanelOpen] = p2(false);
    const [playlistPanelClosing, setPlaylistPanelClosing] = p2(false);
    const nowPlayingIndex = F2(null);
    const [isLoading, setIsLoading] = p2(false);
    const [isPlaying, setIsPlaying] = p2(false);
    const [playlist, setPlaylist] = p2([]);
    const nowPlaying = () => nowPlayingIndex.current === null ? null : playlist[nowPlayingIndex.current];
    _2(() => {
      audio.onended = () => {
        if (nowPlayingIndex.current === playlist.length - 1) {
          stop();
          return;
        }
        skipForward();
      };
      if (!("mediaSession" in navigator)) return;
      navigator.mediaSession.setActionHandler("pause", () => playPause(true));
      navigator.mediaSession.setActionHandler("play", () => playPause(false));
      navigator.mediaSession.setActionHandler("nexttrack", skipForward);
      navigator.mediaSession.setActionHandler("previoustrack", skipBack);
      navigator.mediaSession.setActionHandler("stop", stop);
      navigator.mediaSession.setActionHandler("seekbackward", seek);
      navigator.mediaSession.setActionHandler("seekforward", seek);
      navigator.mediaSession.setActionHandler("seekto", seek);
    }, [playlist]);
    const setupAudioPlayer = () => {
      if (nowPlayingIndex.current === null) return;
      setIsLoading(true);
      audio.src = playlist[nowPlayingIndex.current].src;
      audio.currentTime = 0;
      audio.load();
    };
    const skipForward = () => {
      if (nowPlaying() === null) return;
      playSong(nowPlayingIndex.current < playlist.length - 1 ? nowPlayingIndex.current + 1 : 0);
    };
    const skipBack = () => {
      if (nowPlaying() === null) return;
      playSong(nowPlayingIndex.current > 0 ? nowPlayingIndex.current - 1 : playlist.length - 1);
    };
    const stop = () => {
      audio.pause();
      audio.currentTime = 0;
      nowPlayingIndex.current = null;
      setIsPlaying(false);
      setNavigatorPlaybackState("none");
      setNavigatorMetadata(null);
    };
    const playPause = (playingOverride = null) => {
      let actualIsPlaying = isPlaying;
      if (typeof playingOverride === "boolean") {
        actualIsPlaying = playingOverride;
      }
      if (nowPlaying() === null && !actualIsPlaying) {
        if (playlist.length === 0) return;
        nowPlayingIndex.current = 0;
        setupAudioPlayer();
      }
      if (!actualIsPlaying) {
        audio.play().then(() => {
          setIsLoading(false);
          setIsPlaying(true);
          setNavigatorPlaybackState("playing");
          setNavigatorMetadata(nowPlaying());
          setNavigatorPositionState();
        });
        return;
      }
      if (actualIsPlaying) {
        audio.pause();
        setIsPlaying(false);
        setNavigatorPlaybackState("paused");
      }
    };
    const seek = (details) => {
      let newTime = audio.currentTime;
      if (details.action === "seekto") {
        newTime = details.seekTime || audio.currentTime;
      }
      if (details.action === "seekbackward") {
        newTime -= details.seekOffset || 5;
      }
      if (details.action === "seekforward") {
        newTime += details.seekOffset || 5;
      }
      setNavigatorPositionState();
      if (details.fastSeek && audio.fastSeek) {
        audio.fastSeek(newTime);
        return;
      }
      audio.currentTime = newTime;
    };
    const seekEvent = (event) => {
      const percentage = event.layerX / event.target.offsetWidth;
      seek({ action: "seekto", seekTime: audio.duration * percentage });
    };
    const playSong = (index) => {
      nowPlayingIndex.current = index;
      setupAudioPlayer();
      setIsPlaying(false);
      playPause(false);
    };
    const togglePlaylistPanelOpen = () => {
      if (!playlistPanelOpen) {
        setPlaylistPanelOpen(true);
        setPlaylistPanelClosing(false);
        return;
      }
      setPlaylistPanelClosing(true);
      setTimeout(() => {
        setPlaylistPanelClosing(false);
        setPlaylistPanelOpen(false);
      }, 150);
    };
    const togglePlayPanelOpen = () => setPlayPanelOpen((open) => !open);
    const loadPlaylistFromJson = async (url, playImmediately = false) => {
      const json = await (await fetch(url)).json();
      if (!(Array.isArray(json) && json.every((item) => !!item.src))) {
        throw new Error(
          "JSON contains invalid data - must be an array of objects, containing at minimum `src`."
        );
      }
      if (playImmediately) {
        addToPlaylistAndPlay(json);
        return;
      }
      addToPlaylist(json);
    };
    const addToPlaylist = (items) => {
      if (playlist.length === 0) {
        setPlayPanelOpen(true);
        setPlaylistPanelOpen(true);
      }
      setPlaylist((list) => list.concat(items));
    };
    const addToPlaylistAndPlay = (items) => {
      const len = playlist.length;
      setPlayPanelOpen(true);
      addToPlaylist(items);
      playlist.push(Array.isArray(items) ? items[0] : items);
      playSong(len);
    };
    const removeFromPlaylist = (index) => {
      if (nowPlayingIndex.current === index || playlist.length === 1) {
        stop();
      }
      if (nowPlayingIndex.current > index) {
        nowPlayingIndex.current -= 1;
      }
      setPlaylist((list) => {
        const newList = [...list];
        newList.splice(index, 1);
        return newList;
      });
    };
    window.TomboAudioPlayer = {
      audio,
      addToPlaylist,
      addToPlaylistAndPlay,
      playPause,
      skipBack,
      skipForward,
      loadPlaylistFromJson
    };
    const playPanelClasses = classes({
      [web_player_default.playPanel]: true,
      [web_player_default.open]: playPanelOpen
    });
    return /* @__PURE__ */ u3(k, { children: [
      /* @__PURE__ */ u3("link", { rel: "stylesheet", type: "text/css", href: props.css }),
      /* @__PURE__ */ u3("div", { class: web_player_default.container, children: [
        /* @__PURE__ */ u3("div", { class: playPanelClasses, children: [
          /* @__PURE__ */ u3(NowPlaying, { togglePanel: togglePlaylistPanelOpen, nowPlaying: nowPlaying() }),
          /* @__PURE__ */ u3(
            PlayButtons,
            {
              buttonsEnabled: !!nowPlaying(),
              playPause,
              skipBack,
              skipForward,
              isPlaying,
              isLoading
            }
          ),
          /* @__PURE__ */ u3(Playhead, { buttonsEnabled: !!nowPlaying(), onClick: seekEvent }),
          /* @__PURE__ */ u3(
            PlaylistToggle,
            {
              open: playlistPanelOpen,
              togglePanel: togglePlaylistPanelOpen
            }
          ),
          /* @__PURE__ */ u3(
            PlaylistPanel,
            {
              open: playlistPanelOpen,
              closing: playlistPanelClosing,
              playlist,
              playSong,
              removeSong: removeFromPlaylist,
              nowPlayingIndex: nowPlayingIndex.current,
              closePanel: togglePlaylistPanelOpen
            }
          )
        ] }),
        /* @__PURE__ */ u3(
          FloatingButton,
          {
            isPlaying,
            nowPlaying: nowPlaying(),
            onClick: togglePlayPanelOpen,
            playPanelOpen
          }
        )
      ] })
    ] });
  };
  (async () => {
    const { default: r2wc } = await Promise.resolve().then(() => (init_react_to_webcomponent(), react_to_webcomponent_exports));
    const WebPlayer = r2wc(Player, preact_module_exports, preact_module_exports, {
      props: {
        css: "string"
      },
      shadow: "open"
    });
    window.customElements.define("web-player", WebPlayer);
  })();
})();
