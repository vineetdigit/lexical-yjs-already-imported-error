import "./App.css";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { CollaborationPlugin } from "@lexical/react/LexicalCollaborationPlugin";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";

function App() {
  const theme = {};

  return (
    <LexicalComposer initialConfig={theme}>
      <div className="App">Editor is right below this</div>
      <RichTextPlugin />
      <CollaborationPlugin
        providerFactory={(id, yjsDocMap) => {
          const doc = new Y.Doc();
          yjsDocMap.set(id, doc);
          const provider = new WebsocketProvider(
            "ws://localhost:1234",
            id,
            doc
          );

          return provider;
        }}
      />
    </LexicalComposer>
  );
}

export default App;
