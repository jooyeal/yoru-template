import React, { RefObject, useEffect, useState } from "react";

type Props = {
  ref: RefObject<HTMLTextAreaElement>;
  def: any;
};

const useAutoSizingTextArea = ({ ref, def }: Props) => {
  useEffect(() => {
    if (ref.current) {
      const height = ref.current.scrollHeight;
      const rows = ref.current.rows;
      const rowHeight = 20;
      const trows = Math.ceil(height / rowHeight) - 1;
      ref.current.rows = trows - rows;
    }
    return () => {
      if (ref.current) {
        ref.current.rows = 0;
      }
    };
  }, [ref, def]);
};

export default useAutoSizingTextArea;
