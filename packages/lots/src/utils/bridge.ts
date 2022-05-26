import uuid from "uuid/v4";

class Bridge {
  callbacks = {};

  constructor() {
    this.callbacks = {};
    window.addEventListener(
      "message",
      (event) => this.handleMessage(event),
      false
    );
  }

  handleMessage(event) {
    const id = event?.data?.data?.id;
    const source = event?.data?.source;

    if (source !== "lots_script") return;

    if (id && this.callbacks[id]) {
      this.callbacks[id].onsuccess(event.data?.data);
      delete this.callbacks[id];
    }
  }

  sendMessage(data) {
    return new Promise<any>((resolve) => {
      const id = uuid();

      window.parent.postMessage({ id, ...data }, "*");
      this.callbacks[id] = { onsuccess: (data) => resolve(data) };
    });
  }
}

const bridge = new Bridge();

export default bridge;
