import { Card, CardContent } from "@/components/ui/card";
import { TrophyIcon, BadgeIcon, StarIcon, RocketIcon, MedalIcon } from "lucide-react";
import React from "react";

const Achievements = () => {
  return (
    <div>
      <div className="grid gap-4">
        <div className="grid gap-1">
          <h2 className="text-2xl font-bold">Achievements</h2>
          <p className="text-muted-foreground">
            View your earned achievements and badges.
          </p>
        </div>
        <Card className="p-4">
          <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <TrophyIcon className="h-6 w-6" />
                </div>
                <div className="text-center text-sm font-medium">
                  Completed Beginner React Course
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <BadgeIcon className="h-6 w-6" />
                </div>
                <div className="text-center text-sm font-medium">
                  Earned CSS Mastery Badge
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                  <StarIcon className="h-6 w-6" />
                </div>
                <div className="text-center text-sm font-medium">
                  Reached Top 10% in Community Leaderboard
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <RocketIcon className="h-6 w-6" />
                </div>
                <div className="text-center text-sm font-medium">
                  Completed Advanced JavaScript Course
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <MedalIcon className="h-6 w-6" />
                </div>
                <div className="text-center text-sm font-medium">
                  Won Hackathon Challenge
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Achievements;
