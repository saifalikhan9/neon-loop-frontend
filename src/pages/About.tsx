import aboutImg from "@/assets/workshop-crafting-custom-neon-signs.jpg"

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">About NeonGlow</h1>
      <p className="mt-4 leading-relaxed text-muted-foreground">
        We craft premium custom LED neon signs for homes, events, and brands. Each sign is made-to-order with durable,
        energy‑efficient LEDs, backed by attentive support and fast shipping.
      </p>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border p-5">
          <h3 className="font-medium">Premium Build</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Long‑lasting silicone neon tubing with precise light diffusion.
          </p>
        </div>
        <div className="rounded-xl border p-5">
          <h3 className="font-medium">Made Custom</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Choose your text, color, and size to match your space perfectly.
          </p>
        </div>
        <div className="rounded-xl border p-5">
          <h3 className="font-medium">Fast Support</h3>
          <p className="mt-2 text-sm text-muted-foreground">Friendly service from design to delivery.</p>
        </div>
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
  )
}
