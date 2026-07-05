<script lang="ts">
    import { Button, Card, Badge } from "$lib/components/ui";
    import Logo from "$lib/components/Logo.svelte";
</script>

<svelte:head>
    <title>TechnoFest Academy</title>
</svelte:head>

<section
    class="relative overflow-hidden bg-linear-to-br from-primary-900 via-primary-800 to-primary-700 px-6 py-24 text-surface-50"
>
    <div class="mx-auto max-w-4xl text-center">
        <div class="mb-6 flex justify-center">
            <Logo showText={false} size="xl" />
        </div>
        <div class="mb-5 flex items-center justify-center gap-2">
            <img src="/school-logo.webp" alt="School logo" class="h-8 w-auto" />
            <Badge
                variant="primary"
                class="bg-secondary-200/20 text-primary-200"
            >
                Anas Ibn Malik Official Language School
            </Badge>
        </div>
        <h1 class="text-5xl font-bold tracking-tight md:text-6xl">
            TechnoFest
        </h1>
        <p class="mt-4 text-xl leading-relaxed text-primary-100">
            An Electronic Exhibition — Igniting passion for technology through
            hands-on creation, collaboration, and innovation.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/courses" variant="secondary" size="lg">
                Explore Courses
            </Button>
            <Button
                href="#pillars"
                variant="outline"
                size="lg"
                class="border-primary-200 text-primary-100 hover:bg-primary-700"
            >
                Learn More
            </Button>
        </div>
    </div>
</section>

<section class="mx-auto max-w-5xl space-y-16 px-6 py-20">
    <div class="space-y-4 text-center">
        <h2 class="text-3xl font-bold text-surface-900">About TechnoFest</h2>
        <p class="mx-auto max-w-3xl text-lg leading-relaxed text-surface-600">
            TechnoFest is a proposed electronic exhibition designed to ignite
            passion for technology among students at Anas Ibn Malik Official
            Language School. Targeting students from Prep&nbsp;1 (Grade&nbsp;7)
            to Senior&nbsp;2, this event will serve as a dynamic platform for
            learning, creating, and showcasing projects in cutting-edge
            technological fields. With a focus on hands-on development,
            collaborative problem-solving, and professional presentation skills,
            TechnoFest aims to empower the next generation of innovators.
        </p>
    </div>

    <div id="pillars" class="space-y-12">
        <h2 class="text-center text-3xl font-bold text-surface-900">
            Key Pillars
        </h2>
        <div class="grid gap-8 md:grid-cols-2">
            <Card title="Game Development" class="border-primary-200/50">
                {#snippet footer()}
                    <div class="flex items-center gap-2">
                        <Badge variant="primary">Godot</Badge>
                        <Badge variant="primary">GDScript</Badge>
                    </div>
                {/snippet}
                <p class="text-surface-600">
                    Create interactive digital experiences using Godot Engine —
                    a free and open-source game engine. Learn game design,
                    sprite animation, level design, physics, and object-oriented
                    programming.
                </p>
            </Card>

            <Card
                title="Linux & System Administration"
                class="border-primary-200/50"
            >
                {#snippet footer()}
                    <div class="flex items-center gap-2">
                        <Badge variant="primary">Bash</Badge>
                        <Badge variant="primary">Ubuntu</Badge>
                    </div>
                {/snippet}
                <p class="text-surface-600">
                    Understand and interact with the Linux operating system.
                    Master the command-line interface, file systems, package
                    management, permissions, networking, and the open-source
                    philosophy.
                </p>
            </Card>

            <Card title="Web Development" class="border-primary-200/50">
                {#snippet footer()}
                    <div class="flex items-center gap-2">
                        <Badge variant="primary">HTML/CSS</Badge>
                        <Badge variant="primary">JavaScript</Badge>
                        <Badge variant="primary">Python</Badge>
                    </div>
                {/snippet}
                <p class="text-surface-600">
                    Build interactive websites and web applications using HTML,
                    CSS, and JavaScript for the frontend, with Python
                    (Flask/Django) for backend logic — covering responsive
                    design, data handling, and client-server communication.
                </p>
            </Card>

            <Card title="Artificial Intelligence" class="border-primary-200/50">
                {#snippet footer()}
                    <div class="flex items-center gap-2">
                        <Badge variant="primary">Python</Badge>
                        <Badge variant="primary">scikit-learn</Badge>
                    </div>
                {/snippet}
                <p class="text-surface-600">
                    Explore fundamental AI concepts and their practical
                    application. Learn about machine learning algorithms, data
                    handling, and ethical considerations — integrated into
                    games, chatbots, and data analysis tools.
                </p>
            </Card>
        </div>
    </div>

    <div class="space-y-8">
        <h2 class="text-center text-3xl font-bold text-surface-900">
            Objectives
        </h2>
        <div class="grid gap-6 md:grid-cols-3">
            <div
                class="rounded-xl border border-surface-200 bg-white p-6 text-center"
            >
                <div
                    class="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary-100 text-lg text-primary-600"
                >
                    1
                </div>
                <h3 class="font-semibold text-surface-900">Foster Literacy</h3>
                <p class="mt-2 text-sm text-surface-500">
                    Introduce practical applications of game development, Linux,
                    AI, and web development.
                </p>
            </div>
            <div
                class="rounded-xl border border-surface-200 bg-white p-6 text-center"
            >
                <div
                    class="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary-100 text-lg text-primary-600"
                >
                    2
                </div>
                <h3 class="font-semibold text-surface-900">
                    Stimulate Creativity
                </h3>
                <p class="mt-2 text-sm text-surface-500">
                    Encourage students to conceptualize, design, and implement
                    their unique ideas.
                </p>
            </div>
            <div
                class="rounded-xl border border-surface-200 bg-white p-6 text-center"
            >
                <div
                    class="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary-100 text-lg text-primary-600"
                >
                    3
                </div>
                <h3 class="font-semibold text-surface-900">Build Confidence</h3>
                <p class="mt-2 text-sm text-surface-500">
                    Develop presentation, teamwork, and communication skills
                    through project showcases.
                </p>
            </div>
        </div>
    </div>

    <div class="space-y-8">
        <h2 class="text-center text-3xl font-bold text-surface-900">
            Event Timeline
        </h2>
        <div class="grid gap-6 md:grid-cols-4">
            <div class="rounded-xl border border-surface-200 bg-white p-5">
                <div
                    class="mb-2 text-xs font-bold uppercase tracking-wider text-primary-600"
                >
                    Weeks 1–2
                </div>
                <h3 class="font-semibold text-surface-900">Workshops</h3>
                <p class="mt-1 text-sm text-surface-500">
                    Twice-weekly afternoon sessions covering the core pillars.
                </p>
            </div>
            <div class="rounded-xl border border-surface-200 bg-white p-5">
                <div
                    class="mb-2 text-xs font-bold uppercase tracking-wider text-primary-600"
                >
                    Week 3
                </div>
                <h3 class="font-semibold text-surface-900">Team Formation</h3>
                <p class="mt-1 text-sm text-surface-500">
                    Teams of 2–4 submit a 1-page project proposal.
                </p>
            </div>
            <div class="rounded-xl border border-surface-200 bg-white p-5">
                <div
                    class="mb-2 text-xs font-bold uppercase tracking-wider text-primary-600"
                >
                    Weeks 4–6
                </div>
                <h3 class="font-semibold text-surface-900">Development</h3>
                <p class="mt-1 text-sm text-surface-500">
                    Labs open for project building with mentor guidance.
                </p>
            </div>
            <div class="rounded-xl border border-surface-200 bg-white p-5">
                <div
                    class="mb-2 text-xs font-bold uppercase tracking-wider text-primary-600"
                >
                    Week 7
                </div>
                <h3 class="font-semibold text-surface-900">Exhibition</h3>
                <p class="mt-1 text-sm text-surface-500">
                    Live showcase, demonstrations, judging, and awards.
                </p>
            </div>
        </div>
    </div>

    <div
        class="rounded-2xl bg-gradient-to-br from-primary-700 to-primary-800 px-8 py-12 text-center text-surface-50"
    >
        <h2 class="text-3xl font-bold">Ready to Get Started?</h2>
        <p class="mt-3 text-primary-100">
            Explore our courses and begin your journey in technology.
        </p>
        <div class="mt-6">
            <Button href="/courses" variant="secondary" size="lg">
                Browse Courses
            </Button>
        </div>
    </div>

    <div
        class="flex flex-col items-center gap-3 border-t border-surface-200 pt-8 text-center"
    >
        <img
            src="/school-logo.webp"
            alt="Anas Ibn Malik Official Language School"
            class="h-10 w-auto"
        />
        <p class="text-sm text-surface-400">
            TechnoFest Academy &mdash; An initiative by
            <a
                href="https://anas-ibn-malik-school.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                class="text-primary-600 hover:text-primary-700"
            >
                Anas Ibn Malik Official Language School
            </a>
        </p>
    </div>
</section>
