import { cn, getTechLogos } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default async function DisplayTechIcons({ techStack }: TechIconProps) {
  const techIcons = await getTechLogos(techStack);
  return (
    <div className="flex flex-row">
      {techIcons.slice(0, 3).map(({ tech, url }, index) => (
        <div
          key={index}
          className={cn(
            "relative group bg-dark-300 rounded-full p-2 flex-center",
            index >= 1 && "-ml-3"
          )}
        >
          <span className="tech-tooltip">{tech}</span>
          <Image
            src={url}
            alt={tech}
            width={2}
            height={100}
            className="size-5"
          />
        </div>
      ))}
    </div>
  );
}
