"use client";

import {
  ArrowRight,
  Bell,
  MessageSquare,
  Send,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react";

import { gsap, ScrollTrigger, useGsapScope } from "./gsap-utils";
import { Eyebrow, V2Shell } from "./v2-parts";

const features = [
  { icon: <MessageSquare size={16} />, title: "Real-time Chat", body: "Talk to our stylists instantly" },
  { icon: <ImageIcon size={16} />, title: "Share Designs", body: "Send images or ideas" },
  { icon: <Bell size={16} />, title: "Order Updates", body: "Get notified at every step" },
  { icon: <Sparkles size={16} />, title: "Expert Advice", body: "Personalized recommendations" },
];

const messages = [
  { from: "customer", text: "Hi! I want a custom dress for a wedding." },
  { from: "stylist", text: "Sure! I'd be happy to help. Can you share your design or reference?" },
  { from: "stylist", image: true },
  { from: "customer", text: "This looks perfect! Can we do it in blue?" },
];

/** Dispatches the same event the real storefront widget listens
 * for — this button opens the actual Soul's Glory chat, not a
 * disconnected mockup. */
function openRealChat() {
  window.dispatchEvent(new CustomEvent("sg:chat-open"));
}

export default function StylistChatV2() {
  const scopeRef = useGsapScope<HTMLDivElement>((scope) => {
    gsap.from(scope.querySelectorAll("[data-chat-in]"), {
      opacity: 0,
      y: 22,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.1,
      scrollTrigger: { trigger: scope, start: "top 78%" },
    });

    /* Phone floats gently. */
    gsap.to("[data-phone]", {
      y: -10,
      duration: 3.2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    /* Chat bubbles + typing indicator play once, then settle. */
    const bubbles = gsap.utils.toArray<HTMLElement>(
      scope.querySelectorAll("[data-bubble]"),
    );
    const typing = scope.querySelector("[data-typing]");

    gsap.set(bubbles, { opacity: 0, y: 12, scale: 0.95 });
    gsap.set(typing, { opacity: 0 });

    ScrollTrigger.create({
      trigger: scope,
      start: "top 70%",
      once: true,
      onEnter: () => {
        const tl = gsap.timeline({ delay: 0.3 });

        bubbles.forEach((bubble, index) => {
          if (index > 0) {
            tl.to(typing, { opacity: 1, duration: 0.2 })
              .to({}, { duration: 0.5 })
              .to(typing, { opacity: 0, duration: 0.2 });
          }

          tl.to(bubble, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.8)",
          });
        });
      },
    });

    /* A small notification dot pulses on the header bell. */
    gsap.to("[data-chat-pulse]", {
      scale: 1.6,
      opacity: 0,
      duration: 1.6,
      repeat: -1,
      ease: "power1.out",
    });
  }, []);

  return (
    <section className="border-y border-[var(--v2-border)] bg-white/60 py-16 sm:py-24">
      <V2Shell>
        <div
          ref={scopeRef}
          className="grid items-center gap-10 lg:grid-cols-[0.95fr_0.75fr_0.95fr] lg:gap-8"
        >
          <div data-chat-in>
            <Eyebrow>Always With You</Eyebrow>

            <h2 className="mt-4 text-[30px] font-extrabold leading-[1.1] tracking-[-0.02em] text-[var(--v2-text)] sm:text-[36px]">
              Chat With Your
              <br />
              Personal Stylist
            </h2>

            <p className="mt-4 max-w-[380px] text-[14px] leading-6 text-[var(--v2-text-secondary)]">
              Have a question? Need design advice? Chat with our expert
              stylists anytime and get instant support.
            </p>

            <button
              type="button"
              onClick={openRealChat}
              className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-[var(--v2-text)] px-6 text-[14px] font-semibold text-white transition-colors hover:bg-[var(--v2-primary)]"
            >
              Start Chatting
              <ArrowRight size={16} />
            </button>
          </div>

          {/* PHONE MOCKUP */}
          <div data-chat-in className="flex justify-center">
            <div
              data-phone
              className="relative h-[440px] w-[220px] rounded-[36px] border-[6px] border-[var(--v2-text)] bg-[var(--v2-text)] shadow-[var(--v2-shadow-lg)]"
            >
              <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[30px] bg-[var(--v2-bg-soft)]">
                {/* Status bar */}
                <div className="flex items-center justify-between px-4 pb-1 pt-2 text-[9px] font-semibold text-[var(--v2-text)]">
                  <span>9:41</span>
                  <span>●●●●</span>
                </div>

                {/* Chat header */}
                <div className="flex items-center gap-2 border-b border-[var(--v2-border)] bg-white px-3 py-2.5">
                  <span className="grid size-7 place-items-center rounded-full bg-[var(--v2-primary)] text-[10px] font-bold text-white">
                    SG
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[10.5px] font-bold text-[var(--v2-text)]">
                      Soul&rsquo;s Glory
                    </p>
                    <p className="text-[8.5px] text-[var(--v2-success)]">Online</p>
                  </div>
                  <span className="relative">
                    <Bell size={13} className="text-[var(--v2-text-faint)]" />
                    <span
                      data-chat-pulse
                      className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-[var(--v2-primary)]"
                    />
                  </span>
                </div>

                {/* Messages */}
                <div className="flex-1 space-y-2 overflow-hidden px-3 py-3">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      data-bubble
                      className={`flex ${message.from === "customer" ? "justify-end" : "justify-start"}`}
                    >
                      {message.image ? (
                        <div className="w-[110px] overflow-hidden rounded-xl border border-[var(--v2-border)] bg-[var(--v2-bg-deep)]">
                          <div className="flex aspect-[4/3] items-center justify-center text-[var(--v2-primary)]">
                            <ImageIcon size={22} />
                          </div>
                        </div>
                      ) : (
                        <div
                          className={`max-w-[75%] rounded-2xl px-2.5 py-1.5 text-[9.5px] leading-4 ${
                            message.from === "customer"
                              ? "rounded-br-sm bg-[var(--v2-primary)] text-white"
                              : "rounded-bl-sm border border-[var(--v2-border)] bg-white text-[var(--v2-text)]"
                          }`}
                        >
                          {message.text}
                        </div>
                      )}
                    </div>
                  ))}

                  <div data-typing className="flex justify-start">
                    <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-[var(--v2-border)] bg-white px-3 py-2">
                      {[0, 1, 2].map((dot) => (
                        <span
                          key={dot}
                          className="size-1.5 rounded-full bg-[var(--v2-text-faint)]"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Composer */}
                <div className="flex items-center gap-2 border-t border-[var(--v2-border)] bg-white px-2.5 py-2">
                  <div className="h-7 flex-1 rounded-full bg-[var(--v2-bg-soft)] px-3 text-[9px] leading-7 text-[var(--v2-text-faint)]">
                    Type a message...
                  </div>
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[var(--v2-primary)] text-white">
                    <Send size={12} />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div data-chat-in className="grid gap-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex items-start gap-3 rounded-2xl border border-[var(--v2-border)] bg-white p-4"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[var(--v2-primary-soft)] text-[var(--v2-primary)]">
                  {feature.icon}
                </span>
                <div>
                  <p className="text-[13px] font-bold text-[var(--v2-text)]">
                    {feature.title}
                  </p>
                  <p className="text-[11.5px] text-[var(--v2-text-faint)]">
                    {feature.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </V2Shell>
    </section>
  );
}
