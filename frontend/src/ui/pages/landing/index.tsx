import { observer } from "mobx-react-lite";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { Window, WindowContent, Cutout, Toolbar, WindowHeader } from "react95";
import Markdown from "markdown-to-jsx";

import { BaseButton } from "ui/components";
import { useAppStores } from "store";
import welcomeFileUrl from "assets/welcome.md";

import { PageContainer } from "./styled";

export default observer(() => {
  const { tezosStore } = useAppStores();
  const location = useLocation();
  const navigate = useNavigate();
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch(welcomeFileUrl)
      .then((res) => res.text())
      .then(setMarkdown);
  }, [setMarkdown]);

  const connectHandler = useCallback(async () => {
    await tezosStore.connect();
    const from = location.state?.from?.pathname || "/main";
    navigate(from, { replace: true });
  }, [tezosStore, location, navigate]);

  return (
    <PageContainer>
      <Window>
        <WindowHeader style={{ textAlign: "center" }}>Farkle!</WindowHeader>
        <WindowContent>
          <Cutout style={{ width: "70vw", height: "70vh" }}>
            <Markdown
              className="md"
              children={markdown}
              options={{
                overrides: {
                  table: {
                    props: {
                      style: {
                        borderCollapse: "collapse",
                        width: "100%",
                      },
                    },
                  },
                  th: {
                    props: {
                      style: {
                        border: "1px solid black",
                      },
                    },
                  },
                  td: {
                    props: {
                      style: {
                        border: "1px solid black",
                      },
                    },
                  },
                },
              }}
            />
          </Cutout>
        </WindowContent>
        <Toolbar style={{ justifyContent: "center" }}>
          <BaseButton onClick={connectHandler}>Start game</BaseButton>
        </Toolbar>
      </Window>
    </PageContainer>
  );
});
