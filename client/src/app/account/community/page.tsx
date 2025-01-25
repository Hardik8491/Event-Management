import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { CalendarDaysIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

const Community = () => {
  return (
    <div>
      <div className="grid gap-4">
        <div className="grid gap-1">
          <h2 className="text-2xl font-bold">Community</h2>
          <p className="text-muted-foreground">
            Engage with the community and connect with other learners.
          </p>
        </div>
        <Card className="p-4">
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="flex flex-col items-center gap-2 rounded-lg bg-muted p-4 transition-colors hover:bg-accent hover:text-accent-foreground">
                      <Avatar>
                        <AvatarImage
                          src="/placeholder-user.jpg"
                          alt="John Doe"
                        />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="text-center text-sm font-medium">
                        John Doe
                      </div>
                      <div className="text-center text-sm text-muted-foreground">
                        @johndoe
                      </div>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                      <Avatar>
                        <AvatarImage
                          src="/placeholder-user.jpg"
                          alt="John Doe"
                        />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">John Doe</h4>
                        <p className="text-sm">
                          A passionate learner and active community member.
                        </p>
                        <div className="flex items-center pt-2">
                          <CalendarDaysIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                          <span className="text-xs text-muted-foreground">
                            Joined January 2022
                          </span>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="flex flex-col" />
                  </HoverCardTrigger>
                </HoverCard>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Community;
