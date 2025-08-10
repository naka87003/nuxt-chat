/** IME入力を扱う */
export default function useComposition(callbackFn: () => void) {
  /** IME変換中かどうか */
  const isComposing = ref(false);
  /** IME変換開始 */
  function onCompositionStart() {
    isComposing.value = true;
  }
  /** IME変換確定 */
  function onCompositionEnd() {
    isComposing.value = false;
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key === "Enter" && !isComposing.value) {
      if (!event.shiftKey) {
        event.preventDefault();
        callbackFn();
      }
      // Shiftキーを押している場合は改行される（textareaの場合）
    }
  }

  return {
    isComposing,
    onCompositionStart,
    onCompositionEnd,
    onKeydown,
  };
}
