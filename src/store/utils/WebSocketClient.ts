// import React from "react";
import { IMessageEvent, w3cwebsocket as W3CWebSocket } from "websocket";

export default class WebSocketClient {
  private CONNECTION_KEY = process.env.CONNECTION_KEY_IN_LOCAL_STORAGE || "";
  private WEBSOCKET_URL = process.env.WEBSOCKET_URL || "";
  private client: W3CWebSocket;

  constructor(
    onOpenCallback: () => void,
    onConnectionIdCallback: (connectionId: string) => void,
    onCloseCallback: () => void,
    onGetCredentialOptions: (to: string) => void,
    onReceiveCredentialOptions: (credentialOptions: string) => Promise<void>,
    onAttestationAvailable: (attestation: string) => Promise<void>
  ) {
    console.log("Creating new wssClient");
    const client = new W3CWebSocket(this.WEBSOCKET_URL);

    client.onopen = () => {
      console.log("client.onopen");
      // Send empty message, just to check connectionId
      this.client.send("");

      //  Close after 5 seconds. Just for testing purposes
      // setTimeout(() => {
      //   this.client.close();
      // }, 60000);

      // Invoque this callback when connection is opened
      onOpenCallback();

      // Debug message
      console.log("wssClient Connected");
    };

    client.onmessage = (message: IMessageEvent) => {
      const parsed = JSON.parse(message.data as string) as ISocketResponse;
      console.log("client.onmessage : " + JSON.stringify(parsed, null, 2));

      switch (parsed.action) {
        case "info":
          // Contains connectionId and so on
          if (parsed.data.connectionId) {
            // Save connectionId in state and in localStorage
            localStorage.setItem(this.CONNECTION_KEY, parsed.data.connectionId);
            onConnectionIdCallback(parsed.data.connectionId);
          } else {
            // Backend did not sent connectionId
            console.log("ConnectionId is undefined");
          }
          break;
        case "message":
          // We received a message
          console.log("From : " + parsed.data.from);
          console.log("To : " + parsed.data.to);
          console.log("Message : " + JSON.stringify(parsed.data.message));
          const nextAction = parsed.data.message.nextAction;
          if (nextAction === "getCredentialOptions") {
            onGetCredentialOptions(parsed.data.from);
          } else if (nextAction === "receiveCredentialOptions") {
            onReceiveCredentialOptions(parsed.data.message.credentialOptions)
              .then(() => {})
              .catch((error) => {
                throw new Error(error);
              });
          } else if (nextAction === "onAttestationAvailable") {
            onAttestationAvailable(parsed.data.message.attestation)
              .then(() => {})
              .catch((error) => {
                throw new Error(error);
              });
          } else {
            throw new Error(`nextAction not defined : ${nextAction}`);
          }
          break;

        default:
          // Action not yet implemented
          console.log(`Action ${parsed.action} not yet implemented`);
          break;
      }
    };

    client.onclose = () => {
      console.log("client.onclose");
      // Delete connectionId in state and in localStorage
      localStorage.removeItem(this.CONNECTION_KEY);

      // Invoque this callback when connection is closed
      onCloseCallback();
      console.log("wssClient Closed");
    };

    client.onerror = (event) => {
      console.log(`WebSocket connection to '${this.WEBSOCKET_URL}' failed`);
      console.log(event);
    };

    this.client = client;
  }

  public sendMessage(message: ISocketMessage): void {
    // Send message only if socket is opened
    if (this.client && this.client.readyState === this.client.OPEN) {
      const s = JSON.stringify({ action: "sendmessage", ...message });
      console.log(`websocket Message to send : ${s}`);
      this.client.send(s);
    } else {
      // Send message only if socket is opened
      console.log("Unable to send message : wssClient is not in OPEN state!");
    }
  }

  public isWebSocketOpenned(): boolean {
    const r = this.client && this.client.readyState === this.client.OPEN;
    console.log("isWebSocketOpenned = " + r);
    return r;
  }

  public getWebSocketConnectionId(): string | null {
    const r = this.isWebSocketOpenned()
      ? localStorage.getItem(this.CONNECTION_KEY)
      : null;
    console.log("getWebSocketConnectionId = " + r);
    return r;
  }
}

export interface ISocketMessage {
  to: string;
  message: string;
}

export interface ISocketResponse {
  action: string;
  /* eslint-disable-next-line */
  data: any;
}
