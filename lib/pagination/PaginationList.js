'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PageButtonJs = require('./PageButton.js');

var _PageButtonJs2 = _interopRequireDefault(_PageButtonJs);

var _Const = require('../Const');

var _Const2 = _interopRequireDefault(_Const);

var PaginationList = (function (_React$Component) {
  _inherits(PaginationList, _React$Component);

  function PaginationList(props) {
    var _this = this;

    _classCallCheck(this, PaginationList);

    _get(Object.getPrototypeOf(PaginationList.prototype), 'constructor', this).call(this, props);

    this.documentClick = function (e) {
      var box = _this.refs.pageDropDown;
      var parentDom = box && box.parentNode;
      if (parentDom && !box.contains(e.target)) {
        box.setAttribute("aria-expanded", false);
        parentDom.className = "dropup";
      }
    };

    this.state = {
      searchPage: ""
    };
  }

  _createClass(PaginationList, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.currPage != this.state.searchPage) this.setState({ searchPage: nextProps.currPage });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('click', this.documentClick);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.documentClick);
    }
  }, {
    key: 'changePage',
    value: function changePage(page) {
      if (page == this.props.prePage) {
        page = this.props.currPage - 1 < 1 ? 1 : this.props.currPage - 1;
      } else if (page == this.props.nextPage) {
        page = this.props.currPage + 1 > this.totalPages ? this.totalPages : this.props.currPage + 1;
      } else if (page == this.props.lastPage) {
        page = this.totalPages;
      } else if (page == this.props.firstPage) {
        page = 1;
      } else {
        page = parseInt(page);
      }
      page = isNaN(page) ? 1 : page;
      page = page > this.totalPages ? this.totalPages : page;
      if (page != this.props.currPage) {
        this.props.changePage(page, this.props.sizePerPage);
      }
      this.setState({ searchPage: page });
    }
  }, {
    key: 'changeSizePerPage',
    value: function changeSizePerPage(e) {
      e.preventDefault();

      var selectSize = parseInt(e.currentTarget.text);
      var currPage = this.props.currPage;

      if (selectSize != this.props.sizePerPage) {
        this.totalPages = Math.ceil(this.props.dataSize / selectSize);
        if (currPage > this.totalPages) currPage = this.totalPages;

        this.props.changePage(currPage, selectSize);
        if (this.props.onSizePerPageList) {
          this.props.onSizePerPageList(selectSize);
        }

        this.setState({ searchPage: currPage });

        var currentDom = this.refs.pageDropDown;
        var parentDom = currentDom.parentNode;
        currentDom.setAttribute("aria-expanded", false);
        parentDom.className = "dropup";
      }
    }
  }, {
    key: 'gotoPageHandle',
    value: function gotoPageHandle(e) {
      e.preventDefault();
      var searchPage = e.currentTarget.value;
      this.setState({ searchPage: searchPage });
    }
  }, {
    key: 'pageDropHandle',
    value: function pageDropHandle(e) {
      e.preventDefault();
      if (this.props.onSizePerPageListClick) {
        this.props.onSizePerPageListClick(e);
      } else {
        var currentDom = e.currentTarget;
        var parentDom = currentDom.parentNode;
        var _status = currentDom.getAttribute("aria-expanded");
        if (_status == "true") {
          currentDom.setAttribute("aria-expanded", false);
          parentDom.className = "dropup";
        } else {
          currentDom.setAttribute("aria-expanded", true);
          parentDom.className = "dropup open";
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      this.totalPages = Math.ceil(this.props.dataSize / this.props.sizePerPage);
      var pageBtns = this.makePage();
      var pageListStyle = {
        float: "right",
        marginTop: "0px" //override the margin-top defined in .pagination class in bootstrap.
      };

      var sizePerPageList = this.props.sizePerPageList.map(function (sizePerPage) {
        return _react2['default'].createElement(
          'li',
          { key: sizePerPage, role: 'presentation' },
          _react2['default'].createElement(
            'a',
            { role: 'menuitem', tabIndex: '-1', href: '#', onClick: _this2.changeSizePerPage.bind(_this2) },
            sizePerPage
          )
        );
      });

      return _react2['default'].createElement(
        'div',
        { style: { marginTop: 15 } },
        this.props.sizePerPageList.length > 1 ? _react2['default'].createElement(
          'div',
          { className: 'clearfix' },
          _react2['default'].createElement(
            'div',
            { className: 'dropup', id: 'paginationDropDown' },
            _react2['default'].createElement(
              'button',
              { ref: 'pageDropDown', className: 'btn btn-default dropup-toggle', type: 'button', id: 'pageDropDown', 'data-toggle': 'dropdown', 'aria-expanded': 'false', onClick: this.pageDropHandle.bind(this) },
              this.props.sizePerPage,
              _react2['default'].createElement(
                'span',
                null,
                " ",
                _react2['default'].createElement('span', { className: 'caret' })
              )
            ),
            _react2['default'].createElement(
              'ul',
              { className: 'dropup-menu', role: 'menu', 'aria-labelledby': 'pageDropDown' },
              sizePerPageList
            )
          ),
          _react2['default'].createElement(
            'div',
            { className: 'paginationDesc' },
            _react2['default'].createElement(
              'span',
              { className: 'gotoPage' },
              '转到 ',
              _react2['default'].createElement('input', { value: this.state.searchPage, onChange: this.gotoPageHandle.bind(this) }),
              ' / ',
              this.totalPages,
              '   页'
            ),
            _react2['default'].createElement(
              'a',
              { href: 'javascript:void(0)', className: 'gotoPageBtn', onClick: this.changePage.bind(this, this.state.searchPage) },
              'Go'
            )
          ),
          _react2['default'].createElement(
            'ul',
            { className: 'pagination', style: pageListStyle },
            pageBtns
          )
        ) : _react2['default'].createElement(
          'div',
          { className: 'clearfix' },
          _react2['default'].createElement(
            'div',
            { className: 'paginationDesc' },
            _react2['default'].createElement(
              'span',
              { className: 'gotoPage' },
              '转到 ',
              _react2['default'].createElement('input', { value: this.state.searchPage, onChange: this.gotoPageHandle.bind(this) }),
              ' / ',
              this.totalPages,
              '   页'
            ),
            _react2['default'].createElement(
              'a',
              { href: 'javascript:void(0)', className: 'gotoPageBtn', onClick: this.changePage.bind(this, this.state.searchPage) },
              'Go'
            )
          ),
          _react2['default'].createElement(
            'ul',
            { className: 'pagination', style: pageListStyle },
            pageBtns
          )
        )
      );
    }
  }, {
    key: 'makePage',
    value: function makePage() {
      var pages = this.getPages();
      return pages.map(function (page) {
        var isActive = page === this.props.currPage;
        var disabled = false;
        var hidden = false;
        if (this.props.currPage == 1 && (page === this.props.firstPage || page === this.props.prePage)) {
          disabled = true;
          hidden = true;
        }
        if (this.props.currPage == this.totalPages && (page === this.props.nextPage || page === this.props.lastPage)) {
          disabled = true;
          hidden = true;
        }
        return _react2['default'].createElement(
          _PageButtonJs2['default'],
          { changePage: this.changePage.bind(this), active: isActive, disable: disabled, hidden: hidden, key: page },
          page
        );
      }, this);
    }
  }, {
    key: 'getPages',
    value: function getPages() {
      var startPage = 1,
          endPage = this.totalPages;

      startPage = Math.max(this.props.currPage - Math.floor(this.props.paginationSize / 2), 1);
      endPage = startPage + this.props.paginationSize - 1;

      if (endPage > this.totalPages) {
        endPage = this.totalPages;
        startPage = endPage - this.props.paginationSize + 1;
      }
      var pages;
      if (startPage != 1 && this.totalPages > this.props.paginationSize) {
        pages = [this.props.firstPage, this.props.prePage];
      } else if (this.totalPages > 1) {
        pages = [this.props.prePage];
      } else {
        pages = [];
      }
      for (var i = startPage; i <= endPage; i++) {
        if (i > 0) pages.push(i);
      }
      if (endPage != this.totalPages) {
        pages.push(this.props.nextPage);
        pages.push(this.props.lastPage);
      } else if (this.totalPages > 1) {
        pages.push(this.props.nextPage);
      }
      return pages;
    }
  }, {
    key: 'getCurrentPage',
    value: function getCurrentPage() {
      return this.props.currPage;
    }
  }, {
    key: 'getSizePerPage',
    value: function getSizePerPage() {
      return this.props.sizePerPage;
    }
  }]);

  return PaginationList;
})(_react2['default'].Component);

PaginationList.propTypes = {
  currPage: _react2['default'].PropTypes.number,
  sizePerPage: _react2['default'].PropTypes.number,
  dataSize: _react2['default'].PropTypes.number,
  changePage: _react2['default'].PropTypes.func,
  sizePerPageList: _react2['default'].PropTypes.array,
  paginationSize: _react2['default'].PropTypes.number,
  remote: _react2['default'].PropTypes.bool,
  onSizePerPageList: _react2['default'].PropTypes.func,
  onSizePerPageListClick: _react2['default'].PropTypes.func,
  prePage: _react2['default'].PropTypes.string
};

PaginationList.defaultProps = {
  sizePerPage: _Const2['default'].SIZE_PER_PAGE
};

exports['default'] = PaginationList;
module.exports = exports['default'];