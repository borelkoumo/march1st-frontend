"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
// import React from "react";
var websocket_1 = require("websocket");
var WebSocketClient = /** @class */ (function () {
    function WebSocketClient(onOpenCallback, onConnectionIdCallback, onCloseCallback, onGetCredentialOptions, onReceiveCredentialOptions, onAttestationAvailable) {
        var _this = this;
        this.CONNECTION_KEY = process.env.CONNECTION_KEY_IN_LOCAL_STORAGE || "";
        this.WEBSOCKET_URL = process.env.WEBSOCKET_URL || "";
        console.log("Creating new wssClient");
        var client = new websocket_1.w3cwebsocket(this.WEBSOCKET_URL);
        client.onopen = function () {
            console.log("client.onopen");
            // Send empty message, just to check connectionId
            _this.client.send("");
            //  Close after 5 seconds. Just for testing purposes
            // setTimeout(() => {
            //   this.client.close();
            // }, 60000);
            // Invoque this callback when connection is opened
            onOpenCallback();
            // Debug message
            console.log("wssClient Connected");
        };
        client.onmessage = function (message) {
            var parsed = JSON.parse(message.data);
            console.log("client.onmessage : " + JSON.stringify(parsed, null, 2));
            switch (parsed.action) {
                case "info":
                    // Contains connectionId and so on
                    if (parsed.data.connectionId) {
                        // Save connectionId in state and in localStorage
                        localStorage.setItem(_this.CONNECTION_KEY, parsed.data.connectionId);
                        onConnectionIdCallback(parsed.data.connectionId);
                    }
                    else {
                        // Backend did not sent connectionId
                        console.log("ConnectionId is undefined");
                    }
                    break;
                case "message":
                    // We received a message
                    console.log("From : " + parsed.data.from);
                    console.log("To : " + parsed.data.to);
                    console.log("Message : " + JSON.stringify(parsed.data.message));
                    var nextAction = parsed.data.message.nextAction;
                    if (nextAction === "getCredentialOptions") {
                        onGetCredentialOptions(parsed.data.from);
                    }
                    else if (nextAction === "receiveCredentialOptions") {
                        onReceiveCredentialOptions(parsed.data.message.credentialOptions)
                            .then(function () { })["catch"](function (error) {
                            throw new Error(error);
                        });
                    }
                    else if (nextAction === "onAttestationAvailable") {
                        onAttestationAvailable(parsed.data.message.attestation)
                            .then(function () { })["catch"](function (error) {
                            throw new Error(error);
                        });
                    }
                    else {
                        throw new Error("nextAction not defined : ".concat(nextAction));
                    }
                    break;
                default:
                    // Action not yet implemented
                    console.log("Action ".concat(parsed.action, " not yet implemented"));
                    break;
            }
        };
        client.onclose = function () {
            console.log("client.onclose");
            // Delete connectionId in state and in localStorage
            localStorage.removeItem(_this.CONNECTION_KEY);
            // Invoque this callback when connection is closed
            onCloseCallback();
            console.log("wssClient Closed");
        };
        client.onerror = function (event) {
            console.log("WebSocket connection to '".concat(_this.WEBSOCKET_URL, "' failed"));
            console.log(event);
        };
        this.client = client;
    }
    WebSocketClient.prototype.sendMessage = function (message) {
        // Send message only if socket is opened
        if (this.client && this.client.readyState === this.client.OPEN) {
            var s = JSON.stringify(__assign({ action: "sendmessage" }, message));
            console.log("websocket Message to send : ".concat(s));
            this.client.send(s);
        }
        else {
            // Send message only if socket is opened
            console.log("Unable to send message : wssClient is not in OPEN state!");
        }
    };
    WebSocketClient.prototype.isWebSocketOpenned = function () {
        var r = this.client && this.client.readyState === this.client.OPEN;
        console.log("isWebSocketOpenned = " + r);
        return r;
    };
    WebSocketClient.prototype.getWebSocketConnectionId = function () {
        var r = this.isWebSocketOpenned()
            ? localStorage.getItem(this.CONNECTION_KEY)
            : null;
        console.log("getWebSocketConnectionId = " + r);
        return r;
    };
    return WebSocketClient;
}());
exports["default"] = WebSocketClient;
