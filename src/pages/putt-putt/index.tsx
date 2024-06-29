import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { useState } from "react";

interface PuttPuttPlayer {
  name: string;
  score: number;
}

const PuttPutt = () => {
  const testPlayers = ["Nick", "Lindsy"];

  const holes = Array.from({ length: 18 }, (_, i) => i + 1);

  return (
    <div className="flex w-full p-4 overflow-y-auto">
      <Dialog>
        <table className="table table-sm table-pin-rows table-pin-cols">
          <thead className="text-center">
            <tr>
              <th className="w-1/6"></th>
              {testPlayers.map((player) => (
                <td>{player}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {holes.map((hole) => (
              <tr>
                <td>
                  <span className="text-xs">Hole #{hole}</span>
                </td>
                {testPlayers.map((player) => (
                  <td className="text-center">
                    <DialogTrigger asChild>
                      <button className="btn btn-outline">Enter score</button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Enter hole score</DialogTitle>
                        <DialogDescription>Click your score</DialogDescription>
                      </DialogHeader>

                      <div className="flex flex-wrap">
                        {/* Score button here */}
                      </div>
                    </DialogContent>
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td>Total</td>
            </tr>
          </tbody>
        </table>
      </Dialog>
    </div>
  );
};

export default PuttPutt;
