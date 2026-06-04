export type StaticBlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
  cover_image_url: string | null;
  published_at: string;
};

const aiShouldNotReplaceCareContent = String.raw`There is a common fear that AI will replace human beings.

In some cases, that fear is justified. AI will replace tasks. It will replace workflows. It may replace roles that are mostly repetitive, rules-based, or administrative.

But when we talk about care-based systems — community services, public institutions, healthcare access, education, social support, crisis navigation, housing support, senior care, disability services, and frontline service environments — the conversation needs to become more precise.

The most important work in these environments is not data entry. It is not form routing. It is not searching through documents. It is not repeating the same instructions to different people in slightly different ways.

The real work is trust.

The real work is helping someone understand what to do next when the system feels too complex. It is meeting people where they are. It is recognizing when someone is confused, overwhelmed, embarrassed, scared, isolated, or simply exhausted from having to explain themselves over and over again.

That work should not be replaced by AI.

It should be protected by AI.

## AI is powerful, but it is not automatically neutral

I trust AI deeply when it is designed properly. Not because it is magic, and not because it is automatically neutral. AI is not free from bias. It can inherit bias from data, design choices, policy decisions, prompts, workflows, and the assumptions of the people who build and deploy it.

But AI can be consistent. It can be patient. It can be multilingual. It can be available outside office hours. It can explain the same process clearly without frustration. It can help someone find the right form, service, contact, document, program, or next step without making them feel like a burden.

That matters.

Because in many service environments, the problem is not that people do not care.

The problem is that the people who care are overloaded by the work around the work.

They are answering repeated questions. Searching through scattered information. Managing handoffs. Updating spreadsheets. Explaining intake steps. Coordinating referrals. Translating instructions. Chasing missing documents. Trying to remember which system contains which piece of information.

Every minute spent fighting the system is a minute taken away from the human being in front of them.

That is where AI and better service design can help.

> [!KEY]
> The goal is not to replace empathy. The goal is to operationalize access.

## Empathy has to come before judgment

In any care-based system, empathy has to come first. Then judgment. Because if judgment does not come from empathy, it becomes judgmental.

Good technology should support that standard. It should help organizations respond with more clarity, more consistency, and less friction. It should make services easier to find, easier to understand, and easier to navigate. It should help staff focus on care, not administration.

This matters for anyone who faces barriers: older adults, people with disabilities, immigrants, low-income families, students, caregivers, people in crisis, people with limited digital literacy, people with language barriers, and people who simply do not know how to ask for help in the expected way.

A well-designed AI-supported service system should not feel like a cold machine.

It should feel like a clear path.

It should help people answer simple but important questions:

- Where do I start?
- Which service applies to me?
- What documents do I need?
- Who should I contact?
- What happens next?
- Can I get this in my language?
- Can someone explain this in plain words?
- Can I return to this later?
- Can I trust this?

For organizations, the same system should help answer a different set of questions:

- Where are people getting stuck?
- Which services are hardest to understand?
- Which questions are repeated most often?
- Where are staff spending unnecessary time?
- Which workflows depend too much on manual memory?
- Which tools are helping, and which ones are creating more work?

That is the service design problem underneath the AI conversation.

## The full journey is the product

Before building technology, we need to understand the full journey. Not just the website journey. Not just the form. Not just the chatbot. The real journey.

A person hears about an organization. They search online. They call. They email. They walk in. They speak to someone. They get referred. They wait. They follow up. They fill out a form. They miss a document. They get redirected. They try again.

That full journey is the product.

The website is one part of it. The form is one part of it. The database is one part of it. The staff conversation is one part of it.

The real opportunity is to connect those parts into something clearer, kinder, and more effective.

\`\`\`mermaid
graph LR
  A[Need help] --> B[Find service]
  B --> C[Understand steps]
  C --> D[Complete intake]
  D --> E[Human support]
\`\`\`

This does not mean replacing every tool an organization already uses. In most cases, that would be the wrong move. Real organizations operate inside real constraints: budgets, policies, reporting requirements, legacy systems, vendor platforms, staff habits, privacy obligations, and partner relationships.

Good service technology should build around that reality, not pretend it does not exist.

Sometimes the right answer is integration. Sometimes it is a better intake flow. Sometimes it is a multilingual knowledge assistant. Sometimes it is a staff-facing search tool. Sometimes it is a public-facing service navigator. Sometimes it is reducing dependency on a paid platform by building a lighter internal workflow.

And sometimes the right answer is to leave an existing tool alone because it already works.

The point is not to force technology into the organization.

The point is to understand the organization well enough to know where technology can actually remove burden.

> [!WARNING]
> If AI is added without service design, it becomes another layer people have to navigate.

## Care can be designed into behavior

This is also where AI needs a different kind of training.

People often talk about AI training only in terms of data, accuracy, and performance. Those things matter. But in service environments, they are not enough.

AI can also be trained to behave with care.

That does not mean software has feelings. It does not mean an AI system understands grief, fear, shame, confusion, or trust the way a human being does.

But care is not only a feeling.

Care is also a design discipline.

Care shows up in the way a system explains things. It shows up in whether the language is plain or confusing. It shows up in whether the system makes someone feel stupid for asking a basic question. It shows up in whether the system recognizes uncertainty. It shows up in whether it knows when to slow down, when to simplify, when to ask a better question, and when to send someone to a human being.

An AI assistant can be taught to avoid judgmental language. It can be taught to explain options clearly. It can be taught to recognize when a person may be overwhelmed. It can be taught to reduce shame instead of adding to it. It can be taught to support staff instead of replacing the relationship between staff and community.

That is the next layer of AI design.

The base model may provide intelligence.

But organizations still need to shape how that intelligence behaves.

That is why we say: our agents are smarter, and our agents care.

Not because we believe software has a heart.

But because care can be designed into how a system behaves.

Care shows up in whether the system reduces confusion. Whether it avoids harm. Whether it protects dignity. Whether it gives people a clearer path forward. Whether it supports the person, not just the task.

> [!KEY]
> Intelligence alone is not enough. The system has to support the person, not just solve the task.

## The future is care-based intelligence

A system can be technically powerful and still make people feel lost.

It can answer correctly and still respond coldly.

It can automate a workflow and still make the overall experience worse.

So the question is not only: can the AI solve the task?

The better question is: can it support the person?

That is the difference between automation and care-based intelligence.

The future I believe in is not AI replacing care.

It is AI protecting care.

Not automation for its own sake.

Automation in service of access.

Not judgment first.

Empathy first. Then judgment. Then action.

Because when technology is designed around real human journeys, it can do something powerful.

It can give time, clarity, and capacity back to the people doing the work that matters most.

And it can help the people seeking support feel less lost when they need help the most.`;

export const staticBlogPosts: StaticBlogPost[] = [
  {
    id: 'static-ai-should-not-replace-care',
    slug: 'ai-should-not-replace-care',
    title: 'AI Should Not Replace Care',
    excerpt:
      'AI is most useful in care-based systems when it protects trust, access, and human capacity. The future is not automation for its own sake — it is care-based intelligence built around real service journeys.',
    content: aiShouldNotReplaceCareContent,
    author: 'Nikhil Khedkar',
    tags: ['agentic-care', 'service-design', 'applied-ai', 'accessibility', 'human-ai-systems'],
    cover_image_url: null,
    published_at: '2026-06-04T00:00:00.000Z',
  },
];

export function getStaticBlogPost(slug: string) {
  return staticBlogPosts.find((post) => post.slug === slug) ?? null;
}

export function getStaticBlogPostSummaries() {
  return staticBlogPosts.map(({ content: _content, ...post }) => post);
}
