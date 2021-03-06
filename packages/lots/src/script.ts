import Fennec from "@foxone/fennec-dapp";

export function usePandoLots(opts: {
  attach: string;
  domain: string;
  entries: {
    id: string;
    query: {
      env?: string;
      groupId?: string;
      themeColor?: string;
      entryBg?: string;
    };
  }[];
  modal: {
    id: string;
    query: {
      env?: string;
      groupId?: string;
      groups?: string[];
    };
  };
}) {
  const fennec = new Fennec();
  const attach = document.querySelector(opts.attach) || document.body;
  const domain = opts.domain;
  const entries = opts.entries || [];
  const modal = opts.modal;

  function createEntry(entry) {
    if (!document.querySelector("#" + entry.id)) {
      const el = document.createElement("iframe");
      const query = new URLSearchParams(entry.query);

      query.append("id", entry.id);
      el.src = domain + "/#/entry?" + query;
      el.id = entry.id;
      el.setAttribute(
        "style",
        "border: none; outline: none; background: transparent; height: 96px;"
      );

      attach.appendChild(el);

      return el;
    }

    return;
  }

  function createModal(modal) {
    if (!document.querySelector(modal.id)) {
      const el = document.createElement("iframe");
      const query = new URLSearchParams(modal.query);

      query.append("id", modal.id);
      el.src = domain + "/#/modal?" + query;
      el.id = modal.id;
      el.setAttribute(
        "style",
        "position: fixed; width: 400px; top: 32px; bottom: 32px; right: 32px; height: calc(100% - 64px);" +
          "border: none; outline: none; background: transparent; display: none"
      );

      attach.appendChild(el);

      return el;
    }

    return;
  }

  function sendMessageToModal(data) {
    return modalElement.el?.contentWindow?.postMessage(
      { ...data, source: "lots_script" },
      "*"
    );
  }

  function handleMessage(event) {
    const data = event?.data;
    const action = data?.action;

    if (action === "open_lots_modal") {
      if (!modalElement.el) return;

      modalElement.el.style.display = "block";
      sendMessageToModal(data);
    } else if (action === "close_lots_modal") {
      if (!modalElement.el) return;

      modalElement.el.style.display = "none";
    } else if (action === "query_fennec_installed") {
      sendMessageToModal({
        action: "query_fennec_installed",
        data: { value: fennec.isAvailable(), ...data }
      });
    } else if (action === "fennec_connect") {
      fennec.connect(data.origin).then(() => {
        fennec?.ctx?.wallet
          .signToken({ payload: { from: "pando-lots" } })
          .then((token) => {
            sendMessageToModal({
              action: "fennec_connect",
              data: { token, ...data }
            });
          });
      });
    }
  }

  entries.map((entry) => createEntry(entry));
  const modalElement = { ...modal, el: createModal(modal) };

  window.addEventListener("message", handleMessage, false);
}

(window as any).usePandoLots = usePandoLots;
