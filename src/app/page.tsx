"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";

interface Profile {
  id: string;
  username: string;
  image: string;
}

export default function LandingPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase
        .from("profiledata")
        .select("id, username, image")
        .limit(10);

      if (error) {
        console.error("Error fetching profiles:", error.message);
      } else {
        setProfiles(data);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <section className="relative flex flex-col items-center justify-center space-y-10 px-4 py-24 text-center lg:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)]" />
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Your AI Profile,{" "}
            <span className="bg-gradient-to-r from-slate-500 to-slate-700 bg-clip-text text-transparent">
              Personalized
            </span>
          </h1>
          <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl">
            Create an AI-powered digital presence that truly represents you or
            your business. Share knowledge, answer questions, and engage
            authentically.
          </p>
        </div>

        <div className="relative flex-wrap flex gap-2 flex-row">
          {profiles.map((profile) => (
            <Link
              key={profile.id}
              href={`/${profile.username.replace(/\s+/g, "-").toLowerCase()}`}>
              <Card className="flex flex-col items-center space-y-4 p-6">
                <div className="relative h-24 w-24">
                  <div className="absolute -inset-0.5 animate-tilt rounded-full bg-gradient-to-r from-slate-500 to-slate-700" />
                  <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-white bg-slate-50">
                    <Image
                      src={
                        profile.image ||
                        "https://i.pinimg.com/736x/9c/0b/44/9c0b4442c5eb323aa042644041c96414.jpg"
                      }
                      alt="Avatar"
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-semibold">/{profile.username}</h2>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="gap-2">
            <Link href="/admin">
              Get Your Profile <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
