import aboutImg from "@/assets/workshop-crafting-custom-neon-signs.jpg";

export default function AboutPage() {
  const sectionCnts = [
    {
      title: "Premium Build",
      para: "Long‑lasting silicone neon tubing with precise light diffusion.",
    },
    {
      title: "Made Custom",
      para: "Choose your text, color, and size to match your space perfectly.",
    },
    {
      title: "Fast Support",
      para: "Friendly service from design to delivery.",
    },
  ];
  return (
    <main className="mx-auto max-w-6xl py-12">
      <h1 className="text-center text-4xl font-semibold tracking-tight md:text-5xl mb-5 ">
        About{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-b from-pink-500 to-purple-500">
          NeonLoop
        </span>
      </h1>
      <p className="mt-4 mx-auto leading-relaxed text-muted-foreground max-w-2xl text-center">
        We craft premium custom LED neon signs for homes, events, and brands.
        Each sign is made-to-order with durable, energy‑efficient LEDs, backed
        by attentive support and fast shipping.
      </p>

      <section className="mt-10 grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
        {sectionCnts.map(({ title, para }, i) => (
          <div
            key={i}
            className="rounded-xl border p-5 shadow-sm  bg-gradient-to-b from-pink-500/20 to-purple-500/10 "
          >
            <h3 className="font-medium">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{para}</p>
          </div>
        ))}
      </section>

      <figure className="mt-12 overflow-hidden rounded-xl border">
        <img
          src={aboutImg}
          width={1280}
          height={480}
          alt="Our workshop crafting custom neon signs"
          className="h-auto w-full object-cover"
        />
      </figure>
    </main>
  );
}
