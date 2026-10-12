import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it } from "vitest";
import ChatInput from "~/components/ChatInput.vue";

describe("ChatInput", () => {
  it("emits a trimmed message and clears the input on submit", async () => {
    const wrapper = await mountSuspended(ChatInput);
    const textarea = wrapper.find("textarea");

    await textarea.setValue("  Hello, Nuxt!  ");
    await wrapper.find("form").trigger("submit");

    expect(wrapper.emitted("send-message")).toEqual([["Hello, Nuxt!"]]);
    expect((textarea.element as HTMLTextAreaElement).value).toBe("");
  });

  it("does not emit while streaming", async () => {
    const wrapper = await mountSuspended(ChatInput, {
      props: { isStreaming: true },
    });

    await wrapper.find("textarea").setValue("Message while streaming");
    await wrapper.find("form").trigger("submit");

    expect(wrapper.emitted("send-message")).toBeUndefined();
  });
});
