webpackHotUpdate("main",{

/***/ "./src/components/Login/login.js":
/*!***************************************!*\
  !*** ./src/components/Login/login.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var react_google_login__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-google-login */ "./node_modules/react-google-login/dist/google-login.js");
/* harmony import */ var react_google_login__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_google_login__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _context_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../context/context */ "./src/context/context.js");
/* harmony import */ var _utils_local__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/local */ "./src/utils/local.js");
/* harmony import */ var _utils_notification__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/notification */ "./src/utils/notification.js");
var _jsxFileName = "/Users/tabishmunir/Desktop/project/front_end/src/components/Login/login.js";







function Login() {
  const {
    googleOAuth,
    loginUser,
    show,
    getCurrentUser,
    setRefresh
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_context__WEBPACK_IMPORTED_MODULE_3__["Context"]);
  const history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useHistory"])();
  let current_user = getCurrentUser;
  let current_token = _utils_local__WEBPACK_IMPORTED_MODULE_4__["default"].getToken();

  if (current_token && current_user) {
    history.push({
      pathname: "/"
    });
  } // const loginRequest = useContext(LoginContext);


  const location = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useLocation"])();
  const [emails, setEmails] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("");
  const [password, setPassword] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("");
  const [remember, setRemember] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [error, setError] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const [success, setSuccess] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const [loading, setLoading] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);

  const successWithGoogle = async res => {
    let response = await googleOAuth(res);
    let errors = response === null || response === void 0 ? void 0 : response.data;

    if (errors) {
      setError(errors);
      return;
    }

    let {
      tokens
    } = response;
    _utils_local__WEBPACK_IMPORTED_MODULE_4__["default"].setToken(tokens);
    setRefresh(true);
    history.push({
      pathname: "/"
    });
  };

  function failWithGoogle(res) {
    console.log(res.details);
  }

  const handleLogin = async () => {
    const data = {
      email: emails,
      password
    };
    let response = await loginUser(data);
    let errors = response === null || response === void 0 ? void 0 : response.data;

    if (errors) {
      setError(errors);
      return;
    }

    let {
      tokens
    } = response;

    if (remember) {
      _utils_local__WEBPACK_IMPORTED_MODULE_4__["default"].setToken(tokens);
    } else {
      _utils_local__WEBPACK_IMPORTED_MODULE_4__["default"].setToken(tokens, false);
    }

    setRefresh(true);
    history.push({
      pathname: "/"
    });
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    var _location$state, _location$state$respo;

    setSuccess(location === null || location === void 0 ? void 0 : (_location$state = location.state) === null || _location$state === void 0 ? void 0 : (_location$state$respo = _location$state.response) === null || _location$state$respo === void 0 ? void 0 : _location$state$respo.data);
    setTimeout(() => {
      setSuccess(null);
    }, 5000);
  }, [location]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "login-area",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 5
    }
  }, success && show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_notification__WEBPACK_IMPORTED_MODULE_5__["default"], {
    strong: "Hi! " + (success === null || success === void 0 ? void 0 : success.username),
    message: `You are successfully register as ${success === null || success === void 0 ? void 0 : success.email}. Please verify your email`,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 29
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "d-table",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "d-table-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "login-form",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74,
      columnNumber: 17
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "logo",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "/",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76,
      columnNumber: 25
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: "assets/img/logo.png",
    width: "60%",
    alt: "logo",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77,
      columnNumber: 29
    }
  }))), (error === null || error === void 0 ? void 0 : error.detail) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", {
    style: {
      "color": "red"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80,
      columnNumber: 39
    }
  }, error === null || error === void 0 ? void 0 : error.detail), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 81,
      columnNumber: 21
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 82,
      columnNumber: 25
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    className: "form-control",
    name: "email",
    placeholder: "Email",
    onChange: e => {
      var _e$target;

      return setEmails(e === null || e === void 0 ? void 0 : (_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.value);
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83,
      columnNumber: 29
    }
  }), (error === null || error === void 0 ? void 0 : error.email) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", {
    style: {
      "color": "red"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85,
      columnNumber: 50
    }
  }, error === null || error === void 0 ? void 0 : error.email), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "label-title",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86,
      columnNumber: 29
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "bx bx-user",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87,
      columnNumber: 33
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 91,
      columnNumber: 25
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "password",
    className: "form-control",
    name: "password",
    placeholder: "Password",
    onChange: e => {
      var _e$target2;

      return setPassword(e === null || e === void 0 ? void 0 : (_e$target2 = e.target) === null || _e$target2 === void 0 ? void 0 : _e$target2.value);
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 92,
      columnNumber: 29
    }
  }), (error === null || error === void 0 ? void 0 : error.password) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", {
    style: {
      "color": "red"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94,
      columnNumber: 53
    }
  }, error === null || error === void 0 ? void 0 : error.password), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "label-title",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 29
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "bx bx-lock",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 96,
      columnNumber: 33
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 100,
      columnNumber: 25
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "remember-forgot",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 101,
      columnNumber: 29
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "checkbox-box",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 102,
      columnNumber: 33
    }
  }, "Remember me", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "checkbox",
    onChange: e => {
      var _e$target3;

      return setRemember(e === null || e === void 0 ? void 0 : (_e$target3 = e.target) === null || _e$target3 === void 0 ? void 0 : _e$target3.checked);
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 103,
      columnNumber: 37
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "checkmark",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 104,
      columnNumber: 37
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "/reset",
    className: "forgot-password",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 107,
      columnNumber: 33
    }
  }, "Forgot password?"))), loading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "spinner-border mb-4",
    role: "status",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 110,
      columnNumber: 36
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "sr-only",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 111,
      columnNumber: 33
    }
  }, "Loading...")) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "login-btn mb-4",
    onClick: async () => {
      setLoading(true);
      await handleLogin();
      setLoading(false);
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 112,
      columnNumber: 34
    }
  }, "Login"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-12 mb-2",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 118,
      columnNumber: 29
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_google_login__WEBPACK_IMPORTED_MODULE_2__["GoogleLogin"], {
    className: "text-uppercase",
    clientId: "712698582490-9jg8gv6kvnnl2hfm2t94bfn178jpg80n.apps.googleusercontent.com",
    buttonText: "Sign in Google",
    onSuccess: successWithGoogle,
    onFailure: failWithGoogle,
    cookiePolicy: 'single_host_origin',
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 119,
      columnNumber: 33
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "mb-0",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 127,
      columnNumber: 25
    }
  }, "Don\u2019t have an account? ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "register",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 127,
      columnNumber: 68
    }
  }, "Sign Up"))))))));
}

/* harmony default export */ __webpack_exports__["default"] = (Login);

/***/ })

})
//# sourceMappingURL=main.4289e1e52c451c8a21ae.hot-update.js.map