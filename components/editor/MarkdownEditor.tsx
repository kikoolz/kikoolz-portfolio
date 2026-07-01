"use client";

import dynamic from "next/dynamic";
import {
  commands,
  ICommand,
} from "@uiw/react-md-editor";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function MarkdownEditor({ value, onChange }: Props) {
  return (
    <div
      onDrop={async (e) => {
        e.preventDefault();

        const file = e.dataTransfer.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (data.url) {
          onChange(value + `\n\n![image](${data.url})\n\n`);
        }
      }}
      onDragOver={(e) => e.preventDefault()}
      data-color-mode="light"
    >
      <MDEditor
        value={value}
        onChange={(val) => onChange(val || "")}
        height={500}
        preview="live"
        visibleDragbar={true}
        commands={[
          commands.bold,
          commands.italic,
          commands.title,
          commands.quote,
          commands.code,
          commands.link,
          commands.unorderedListCommand,
          commands.orderedListCommand,
        ]}
      />
    </div>
  );
}
