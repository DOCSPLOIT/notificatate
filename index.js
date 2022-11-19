const { React } = window;

const ReactAppFromCDN = () => {
  const [data, setData] = React.useState(notifications);
  const [unread, setUnread] = React.useState(0);

  React.useEffect(() => {
    unreadNotifcationsCOunt();
  });

  const unreadNotifcationsCOunt = () => {
    setUnread(data.filter((t) => t.read === false).length);
  };
  function setAsRead(index) {
    const mutated = data.map((t, i) => {
      if (index !== undefined) {
        if (index === i) {
          t.read = true;
        }
      } else {
        t.read = true;
      }
      return t;
    });
    unreadNotifcationsCOunt();
    setData(mutated);
  }

  const items = data.map((t, i) => {
    switch (t.type) {
      case "TO_USER": {
        return (
          <div
            onClick={() => setAsRead(i)}
            class={
              "mt-2  rounded-md flex  px-4 py-4 " +
              (t.read === true ? "" : "bg-[#f6fafd] shadow-sm cursor-pointer")
            }
          >
            <img alt="user_pic" class="h-12" src={t.user.image} />
            <div class="ml-4">
              <div class="flex relative">
                <p
                  class={
                    "text-[#636772] " +
                    (t.read === true
                      ? ""
                      : "after:absolute after:bg-red-400 after:rounded-full after:w-[8px] after:h-[8px] after:bottom-2 after:ml-2")
                  }
                >
                  <b class="text-black">{t.user.name}</b>&nbsp;&nbsp;{t.text}
                  &nbsp;&nbsp;
                  {t.extras && t.extras.text && <b>{t.extras.text}</b>}
                </p>
              </div>
              <p class="text-gray-400 mt-0">{t.time}</p>
            </div>
            {t.extras && t.extras.img && (
              <img class="h-11 ml-auto" src={t.extras.img} alt="post" />
            )}
          </div>
        );
      }
      case "GROUP_INFO": {
        return (
          <div
            onClick={() => setAsRead(i)}
            class={
              "mt-2  rounded-md flex space-x-4 px-4 py-4 " +
              (t.read ? "" : "bg-[#f6fafd] shadow-sm cursor-pointer")
            }
          >
            <img alt="user_pic" class="h-12" src={t.user.image} />
            <div>
              <div class="flex relative">
                <p
                  class={
                    "text-[#636772] " +
                    (t.read
                      ? ""
                      : "after:absolute after:bg-red-400 after:rounded-full after:w-[8px] after:h-[8px] after:bottom-2 after:ml-2")
                  }
                >
                  <b class="text-black">{t.user.name}</b>&nbsp;&nbsp;{t.text}
                  &nbsp;&nbsp;
                  <b class="text-[#0e2d63]">{t.extras.text}</b>
                </p>
              </div>
              <p class="text-gray-400 mt-0">{t.time}</p>
            </div>
          </div>
        );
      }
      case "MSG": {
        return (
          <div
            onClick={() => setAsRead(i)}
            class="mt-2 rounded-md flex space-x-4 px-4 py-4"
          >
            <img alt="user_pic" class="h-12" src={t.user.image} />
            <div>
              <div class="flex">
                <p class="text-[#636772]">
                  <b class="text-black">{t.user.name}</b>&nbsp;&nbsp;{t.text}
                </p>
              </div>
              <p class="text-gray-400 mt-0">{t.time}</p>
              <div class="border p-3 rounded-md mt-3">
                <p class="px-2 text-[#636772]">{t.message}</p>
              </div>
            </div>
          </div>
        );
      }
    }
  });

  return (
    <div>
      <div class="flex mt-8 items-center text-end w-full">
        <h1 class="font-bold text-[#1e222b] text-2xl">Notifications</h1>
        <div class="h-[25px] ml-2 w-[32px] rounded-md bg-[#0a317b] text-white text-center font-bold">
          {unread}
        </div>
        <p
          onClick={() => setAsRead()}
          class="cursor-pointer self-end ml-auto pl-1 mb-1 text-[#636772] space-x-16"
        >
          Mark all as read
        </p>
      </div>
      <div class="mt-7">{items}</div>
    </div>
  );
};
ReactDOM.render(<ReactAppFromCDN />, document.querySelector("#root"));
