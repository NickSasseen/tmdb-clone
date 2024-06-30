import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogClose, DialogTrigger } from "@radix-ui/react-dialog";
import { Plus, PlusCircle, Skull, X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

class PuttPuttPlayer {
  constructor(public name: string) {}

  public scores: number[] = Array<number>(18);

  public get total(): number {
    return this.scores.reduce(
      (previous, current, index, array) => previous + current
    );
  }
}

const holes = Array.from({ length: 18 }, (_, i) => i + 1);

const PuttPutt = () => {
  const [players, setPlayers] = useState<PuttPuttPlayer[]>([]);
  const [addPlayerModal, setAddPlayerModal] = useState({ open: false });
  const [scoreModal, setScoreModal] = useState<{
    open: boolean;
    hole: number;
    player?: PuttPuttPlayer;
  }>({
    open: false,
    hole: 0,
    player: undefined,
  });

  const openModal = (hole: number, player: PuttPuttPlayer) =>
    setScoreModal({ open: true, hole, player });
  const closeModal = () =>
    setScoreModal((orig) => {
      orig.open = false;
      return orig;
    });

  return (
    <>
      <div className="flex w-full max-h-screen p-4 overflow-y-auto">
        <table className="table table-sm table-pin-rows table-pin-cols">
          <thead className="text-center">
            <tr>
              <th className="w-1/5"></th>
              {players.map((player) => (
                <td className="text-lg capitalize">{player.name}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {holes.map((hole) => (
              <tr>
                <td>
                  <span className="text-xs">#{hole}</span>
                </td>
                {players.map((player) => (
                  <td className="text-center">
                    <Button
                      variant="outline"
                      className="w-12 h-12"
                      onClick={() => openModal(hole, player)}
                    ></Button>
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td>Total</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button
        className="btn btn-secondary btn-circle absolute bottom-4 right-4"
        onClick={() => setAddPlayerModal({ open: true })}
      >
        <Plus />
      </button>

      <ScoreModal
        open={scoreModal.open}
        closeModal={closeModal}
        hole={scoreModal.hole}
      />

      <AddPlayerModal
        open={addPlayerModal.open}
        onClose={() => {
          setAddPlayerModal({ open: false });
        }}
        players={players}
        setPlayers={setPlayers}
      />
    </>
  );
};

interface AddPlayerModalProps {
  open: boolean;
  players: PuttPuttPlayer[];
  setPlayers: Dispatch<SetStateAction<PuttPuttPlayer[]>>;
  onClose: () => void;
}
const AddPlayerModal = ({
  open,
  onClose,
  players,
  setPlayers,
}: AddPlayerModalProps) => {
  const [name, setName] = useState("");
  const addPlayer = () => {
    setPlayers([...players, new PuttPuttPlayer(name)]);
    setName("");
  };

  const removePlayer = (player: PuttPuttPlayer) => {
    setPlayers([...players].filter((p) => p.name !== player.name));
  };

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-md p-4">
        <DialogHeader>
          <DialogTitle>Add Players</DialogTitle>
        </DialogHeader>
        <div className="flex w-full items-center space-x-2">
          <Input
            value={name}
            onChange={(x) => setName(x.currentTarget.value)}
            placeholder="Enter name"
          />
          <button className="btn btn-secondary" onClick={addPlayer}>
            Add
          </button>
        </div>
        Current players
        <div className="flex flex-wrap">
          {players &&
            players.map((player) => (
              <div className="basis-1/2 p-1">
                <Card className="flex-1 justify-center p-2">
                  <div className="flex items-center justify-between">
                    <span className="flex-1">{player.name}</span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="basis-1/4"
                      onClick={() => removePlayer(player)}
                    >
                      <X className="h-4 w-4 font-light" />
                    </Button>
                  </div>
                </Card>
              </div>
            ))}
        </div>
        <DialogFooter className="flex justify-end">
          <DialogClose asChild>
            <button className="btn btn-secondary" onClick={onClose}>
              Done
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const ScoreModal = ({
  hole,
  open,
  closeModal,
}: {
  hole: number;
  open: boolean;
  closeModal: () => void;
}) => {
  const handleOpenChange = (isOpen: boolean) => {
    console.log("isOpen", isOpen);
  };
  const handleScoreSelection = (score: number) => {
    console.log("selected", score);
  };

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogContent className="max-w-screen p-4">
        <DialogHeader>
          <DialogTitle>Enter score for hole #{hole}</DialogTitle>
          <DialogDescription>Click your score</DialogDescription>
        </DialogHeader>

        <div className="flex items-center flex-wrap">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((score) => (
            <div key={score} className="basis-1/5 p-4">
              <button
                className="btn btn-square btn-primary w-full"
                onClick={() => handleScoreSelection(score)}
              >
                {score}
              </button>
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <button className="btn" onClick={closeModal}>
              Close
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PuttPutt;
