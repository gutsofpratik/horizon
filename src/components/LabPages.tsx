import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, LabIcon } from "./LabIcons";
import { ResearchExplorer, NeuralField } from "./ResearchExplorer";
import { PUBLIC_CONTACT } from "../data/labContent";
import "./LabPages.css";

const names: Record<string, string> = {
  research: "Research",
  about: "About",
  contact: "Contact",
};
export function LabPages({ page }: { page: string }) {
  useEffect(() => {
    document.title = `${names[page] ?? "Page not found"} — Horizons Lab`;
  }, [page]);
  if (page === "research") return <ResearchPage />;
  if (page === "about") return <AboutPage />;
  if (page === "contact") return <ContactPage />;
  return (
    <section className="page-width inner-hero">
      <span className="section-label">404</span>
      <h1>A different horizon.</h1>
      <p>This page doesn’t exist. There’s more to explore back at the lab.</p>
      <a className="button" href="/">
        Back to the lab
        <ArrowRight size={16} />
      </a>
    </section>
  );
}
function ResearchPage() {
  return (
    <>
      <section className="page-width inner-hero research-page-hero">
        <a className="breadcrumb" href="/">
          Horizons Lab <span>/</span> Research
        </a>
        <div className="inner-hero-grid">
          <div>
            <span className="section-label">Questions worth working on</span>
            <h1>
              What could
              <br />
              intelligence become?
            </h1>
            <p>
              We’re interested in how models learn, how they run, and what they
              can do with the right tools. These are the directions shaping our
              lab.
            </p>
          </div>
          <div className="research-hero-art">
            <NeuralField />
            <span className="figure-label">
              From a question to a possibility.
            </span>
          </div>
        </div>
      </section>
      <section className="page-width research-learning-entry"><span className="section-label">Model learning</span><h2>How intelligence learns.</h2><p>Explore a complete learning path through data, representations, attention, training, adaptation, and evaluation.</p><a className="reference-primary-button" href="/research/model-learning">Explore model learning</a><div><a href="/research/model-learning/tokens">From text to tokens →</a><a href="/research/model-learning/transformers">Inside a transformer →</a><a href="/research/model-learning/fine-tuning">Adapting a model →</a></div></section>
      <section className="page-width research-page-explorer reveal">
        <ResearchExplorer expanded />
      </section>
      <section className="page-width section-space reveal">
        <div className="section-heading">
          <div>
            <span className="section-label">Our approach</span>
            <h2>
              A useful question.
              <br />
              An honest experiment.
            </h2>
          </div>
          <p>
            Progress starts small. Our approach is to make the question
            specific, the work inspectable, and the conclusions proportionate to
            the evidence.
          </p>
        </div>
        <div className="approach-grid">
          {[
            {
              icon: "research" as const,
              title: "Start with a question",
              copy: "Choose a concrete task, constraint, or limitation worth understanding.",
            },
            {
              icon: "code" as const,
              title: "Build to understand",
              copy: "Use small experiments and working prototypes to test the idea.",
            },
            {
              icon: "training" as const,
              title: "Measure the difference",
              copy: "Compare results, document trade-offs, and keep limitations visible.",
            },
            {
              icon: "layers" as const,
              title: "Share what’s useful",
              copy: "Turn the useful pieces into tools, notes, and reproducible work.",
            },
          ].map((item) => (
            <article key={item.title}>
              <LabIcon name={item.icon} size={25} />
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="page-width open-questions reveal">
        <div className="section-heading">
          <div>
            <span className="section-label">Open questions</span>
            <h2>On our minds.</h2>
          </div>
          <p>
            A few questions shaping the work ahead. Open one to explore how we
            would approach it.
          </p>
        </div>
        {[
          {
            title: "Can a focused model be a more useful model?",
            focus: "Training & adaptation",
            copy: "Compare an unchanged small model with a task-specific adaptation on the same held-out tasks. Look beyond a single score: accuracy, failure modes, data quality, and the cost of keeping it useful all matter.",
            outcome:
              "A clearer account of when fine-tuning helps—and when it does not.",
          },
          {
            title: "What should an agent show before it acts?",
            focus: "Agents & human control",
            copy: "Explore how intent, tool inputs, expected changes, and approval requests can make a workflow easier to follow. A useful agent should help people understand what will happen and review what actually changed.",
            outcome:
              "Tool interactions people can inspect, understand, and interrupt.",
          },
          {
            title: "Where does local intelligence reach its limits?",
            focus: "Inference & efficiency",
            copy: "Compare formats, context sizes, and runtime choices on a clearly described machine. Track memory, responsiveness, and task quality together rather than treating a smaller file or a faster response as the whole result.",
            outcome:
              "Practical trade-offs that other people can reproduce on their hardware.",
          },
        ].map((question, index) => (
          <details
            className="question-item"
            key={question.title}
            open={index === 0}
          >
            <summary>
              <span>{question.title}</span>
              <span className="question-toggle" aria-hidden="true" />
            </summary>
            <div className="question-body">
              <span>{question.focus}</span>
              <p>{question.copy}</p>
              <p className="question-outcome">
                What we’d hope to learn: {question.outcome}
              </p>
            </div>
          </details>
        ))}
      </section>
      <section className="publication-note">
        <div className="page-width">
          <LabIcon name="research" size={28} />
          <div>
            <h2>Work in progress is still work.</h2>
            <p>
              Our model-training directions are ambitions, not announced model
              releases. Published software and companion guides live in the open
              ecosystem. Future experiment reports will have their own methods,
              results, and limitations.
            </p>
          </div>
          <a className="text-link" href="/#ecosystem">
            Explore what’s public
            <ArrowUpRight size={16} />
          </a>
        </div>
      </section>
      <PageInvitation title="A better question starts a conversation." />
    </>
  );
}
function AboutPage() {
  return (
    <>
      <section className="page-width inner-hero">
        <a className="breadcrumb" href="/">
          Horizons Lab <span>/</span> About
        </a>
        <span className="section-label">Independent by nature</span>
        <h1>
          Curiosity is
          <br />
          where we begin.
        </h1>
        <p className="about-lead">
          Horizons Lab is an independent AI lab built around a simple belief:
          intelligence becomes more interesting when people can shape it.
        </p>
      </section>
      <section className="about-statement page-width reveal">
        <span className="section-label">Why we’re here</span>
        <div>
          <h2>
            There’s more to AI
            <br />
            than another chat box.
          </h2>
          <p>
            We want to understand how models learn, build tools that make them
            useful, and explore what happens when people can work with
            intelligence on their own terms.
          </p>
          <p>
            Horizon is the first public expression of that thinking: a workspace
            for models, files, tools, and agents. The lab’s direction reaches
            further, into training, adaptation, efficient inference, and the
            systems around them.
          </p>
          <a className="text-link" href="/research">
            Explore our research directions
            <ArrowUpRight size={16} />
          </a>
        </div>
      </section>
      <section className="values-section">
        <div className="page-width">
          <span className="section-label">What guides the work</span>
          <div className="values-grid">
            {[
              {
                icon: "research" as const,
                title: "Stay curious.",
                copy: "Good questions matter more than impressive-sounding answers. Make room to explore and change your mind.",
              },
              {
                icon: "workflow" as const,
                title: "Build something useful.",
                copy: "Connect ideas to real work. A small tool that helps someone is a meaningful outcome.",
              },
              {
                icon: "layers" as const,
                title: "Keep the work open.",
                copy: "Make the source and the trade-offs visible. Give other people something they can inspect and build on.",
              },
            ].map((item) => (
              <article className="reveal" key={item.title}>
                <LabIcon name={item.icon} size={30} />
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="page-width people-section reveal">
        <div>
          <span className="section-label">People, before the technology</span>
          <h2>
            Small beginnings.
            <br />
            An open horizon.
          </h2>
          <p>
            We’re building independently and sharing the work as it develops.
            You don’t need a big team to ask a good question—or a finished
            answer to start a useful conversation.
          </p>
        </div>
        <a className="maintainer-card" href="/company/mission"><div><h3>Horizons Lab</h3><p>Independent research and development</p><span>Our mission <ArrowUpRight size={14}/></span></div></a>
      </section>
      <PageInvitation title="The next idea could start with you." />
    </>
  );
}
function ContactPage() {
  const [topic, setTopic] = useState("Research collaboration");
  const email = PUBLIC_CONTACT.email;
  return (
    <>
      <section className="page-width inner-hero">
        <a className="breadcrumb" href="/">
          Horizons Lab <span>/</span> Contact
        </a>
        <span className="section-label">Start a conversation</span>
        <h1>
          Good things begin
          <br />
          with a hello.
        </h1>
        <p>
          Have a research question, a tool you want to build, or a different way
          of looking at something? We’d like to hear it.
        </p>
      </section>
      <section className="page-width contact-layout reveal">
        <div className="contact-options">
          <article className="contact-channel">
            <LabIcon name="mail" size={24} />
            <div>
              <h2>Email the lab</h2>
              <p>For general enquiries and collaboration.</p>
              {email ? (
                <a className="contact-address" href={`mailto:${email}`}>
                  {email}
                  <ArrowUpRight size={17} />
                </a>
              ) : (
                <span className="contact-placeholder">
                  Email address coming soon
                  <span>Contact details to be announced</span>
                </span>
              )}
            </div>
          </article>
          <article className="contact-channel">
            <LabIcon name="code" size={24} />
            <div>
              <h2>Find us on GitHub</h2>
              <p>Explore the work and the people behind it.</p>
              <a
                className="contact-address"
                href={PUBLIC_CONTACT.github}
                target="_blank"
                rel="noreferrer"
              >
                Horizons Lab on GitHub
                <ArrowUpRight size={17} />
              </a>
            </div>
          </article>
          <article className="contact-channel">
            <LabIcon name="workflow" size={24} />
            <div>
              <h2>Need help with Horizon?</h2>
              <p>Report a reproducible bug or suggest a feature.</p>
              <a
                className="text-link"
                href={PUBLIC_CONTACT.issues}
                target="_blank"
                rel="noreferrer"
              >
                Open the issue tracker
                <ArrowUpRight size={16} />
              </a>
            </div>
          </article>
        </div>
        <aside className="conversation-card">
          <span className="section-label">A shared starting point</span>
          <h2>
            What’s on
            <br />
            your mind?
          </h2>
          <p>
            Choose a topic to start a public conversation with us on GitHub.
          </p>
          <div
            className="contact-topics"
            role="group"
            aria-label="Conversation topic"
          >
            {[
              "Research collaboration",
              "Building tools",
              "Horizon feedback",
            ].map((item) => (
              <button
                key={item}
                aria-pressed={topic === item}
                onClick={() => setTopic(item)}
              >
                {item}
                <span aria-hidden="true">{topic === item ? "↗" : "+"}</span>
              </button>
            ))}
          </div>
          <a
            className="button"
            href={`${PUBLIC_CONTACT.issues}/new?title=${encodeURIComponent(topic)}&body=${encodeURIComponent("I would like to discuss " + topic.toLowerCase() + ".\n\nMy idea or question:\n")}`}
            target="_blank"
            rel="noreferrer"
          >
            Continue on GitHub
            <ArrowUpRight size={16} />
          </a>
          <span className="contact-compose-note">
            Opens a draft issue for you to review before posting.
          </span>
        </aside>
      </section>
      <section className="page-width contact-closing">
        <span className="status-dot" />
        <p>Independent minds. Shared horizons.</p>
      </section>
    </>
  );
}
function PageInvitation({ title }: { title: string }) {
  return (
    <section className="page-invitation">
      <div className="page-width">
        <h2>{title}</h2>
        <a className="button" href="/contact">
          Let’s talk
          <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}
