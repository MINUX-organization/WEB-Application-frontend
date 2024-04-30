import { FTextInput } from "./FTextInput";

const FCodeInput: typeof FTextInput = (props) => {
  return (
    <FTextInput
      {...props}
      textareaProps={{
        ...props.textareaProps,
        onKeyDown: (e) => {
          if (e.code === 'Tab') {
            e.preventDefault()
            const tabSize = 2;
            const selectionStart = e.currentTarget.selectionStart;
            const lineStart = e.currentTarget.value.lastIndexOf('\n', selectionStart - 1) + 1;
            if (e.shiftKey) {
              const spaceCount = e.currentTarget.value.slice(lineStart, lineStart + tabSize).replace(/\S[\s\S]*/, '').length
              console.log(lineStart, selectionStart, spaceCount);
              e.currentTarget.value =
                e.currentTarget.value.slice(0, lineStart) +
                e.currentTarget.value.slice(lineStart + spaceCount);
              e.currentTarget.setSelectionRange(
                Math.max(selectionStart - spaceCount, lineStart),
                Math.max(selectionStart - spaceCount, lineStart)
              );
            } else {
              e.currentTarget.value =
                e.currentTarget.value.slice(0, lineStart + 0) +
                Array(tabSize).fill(' ').join('') +
                e.currentTarget.value.slice(lineStart);
              e.currentTarget.setSelectionRange(selectionStart + tabSize, selectionStart + tabSize);
            }
          }
        }
      }}
      multiline
    />
  )
}

export default FCodeInput;
