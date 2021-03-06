'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('./react-leaflet-search.css');

var _leaflet = require('leaflet');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactLeaflet = require('react-leaflet');

var _InputBox = require('./InputBox');

var _InputBox2 = _interopRequireDefault(_InputBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ReactLeafletSearch extends _reactLeaflet.MapControl {
    constructor(props, context) {
        super(props);
        this.div = _leaflet.DomUtil.create('div', 'leaflet-search-wrap');
        this.state = {
            search: false,
            info: false
        };
        this.markerIcon = (0, _leaflet.icon)({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowSize: [41, 41]
        });
        this.map = context.map || props.leaflet.map;
    }

    createLeafletElement(props) {
        const ReactLeafletSearch = _leaflet.Control.extend({
            onAdd: map => this.div,
            onRemove: map => {}
        });
        return new ReactLeafletSearch(props);
    }

    latLngHandler(latLng, info) {
        const popUpStructure = _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'p',
                null,
                Array.isArray(info) ? info.toString() : info
            ),
            _react2.default.createElement('div', { style: { "width": "100%", "height": "1px", "backgroundColor": "#eee" } }),
            _react2.default.createElement(
                'div',
                null,
                `latitude: ${latLng[0]}`
            ),
            _react2.default.createElement(
                'div',
                null,
                `longitude: ${latLng[1]}`
            )
        );
        this.goToLatLng(latLng, popUpStructure);
    }

    removeMarkerHandler() {
        this.setState({ search: false });
    }

    goToLatLng(latLng, info) {
        this.setState({ search: latLng, info: info }, () => {
            this.flyTo();
        });
    }
    flyTo() {
        this.map.flyTo([...this.state.search], this.props.zoom || 10);
    }

    componentDidMount() {
        super.componentDidMount();
        _reactDom2.default.render(_react2.default.createElement(_InputBox2.default, _extends({}, this.props, {
            map: this.map,
            latLngHandler: this.latLngHandler.bind(this),
            removeMarker: this.removeMarkerHandler.bind(this) })), this.div);
    }

    componentDidUpdate() {
        this.markerRef && this.markerRef.leafletElement.openPopup();
    }

    render() {
        this.markerRef = false;
        return this.state.search ? _react2.default.createElement(
            _reactLeaflet.Marker,
            {
                ref: ref => this.markerRef = ref,
                icon: this.props.markerIcon || this.markerIcon,
                key: `marker-search-${this.state.search.toString()}`,
                position: [...this.state.search] },
            _react2.default.createElement(
                _reactLeaflet.Popup,
                null,
                _react2.default.createElement(
                    'span',
                    null,
                    this.state.info
                )
            )
        ) : null;
    }
}
exports.default = ReactLeafletSearch;