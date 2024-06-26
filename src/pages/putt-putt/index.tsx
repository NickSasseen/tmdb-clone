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
import { Dispatch, SetStateAction, useEffect, useState } from "react";

class PuttPuttPlayer {
  constructor(public name: string) {
    this.scores = new Array<number>();
  }

  public scores: number[];

  public get total(): number {
    return this.scores.reduce(
      (previous, current, index, array) => previous + current,
      0
    );
  }
}

const SESSION_STORAGE_KEYS = {
  PLAYERS: "players",
};

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

  useEffect(() => {
    // persist the players
    const playerVal = sessionStorage.getItem(SESSION_STORAGE_KEYS.PLAYERS);
    if (playerVal) {
      const sessionPlayers = JSON.parse(playerVal) as PuttPuttPlayer[];
      setPlayers(sessionPlayers);
    }
  }, []);

  const addScoreToPlayer = (
    player: PuttPuttPlayer,
    hole: number,
    score: number
  ) => {
    const copyOfPlayers = players;
    const thisPlayer = copyOfPlayers.find(
      (p) => p.name === player.name
    ) as PuttPuttPlayer;
    thisPlayer.scores[hole] = score;
    setPlayers(copyOfPlayers);
    // update session storage
    // add to session storage
    sessionStorage.setItem(
      SESSION_STORAGE_KEYS.PLAYERS,
      JSON.stringify(copyOfPlayers)
    );
    closeModal();
  };

  const openModal = (hole: number, player: PuttPuttPlayer) =>
    setScoreModal({ open: true, hole, player });

  const closeModal = () =>
    setScoreModal({
      open: false,
      hole: 0,
      player: undefined,
    });

  const clear = () => {
    setPlayers([]);
    sessionStorage.removeItem(SESSION_STORAGE_KEYS.PLAYERS);
  };

  return (
    <>
      {players.length > 0 && (
        <div className="flex flex-col w-full max-h-screen p-4 overflow-y-auto">
          <table className="table table-sm table-pin-rows table-pin-cols">
            <thead className="text-center">
              <tr>
                <th className="w-1/5"></th>
                {players.map((player) => (
                  <td key={player.name} className="text-lg capitalize">
                    {player.name}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {holes.map((hole) => (
                <tr key={hole}>
                  <td>
                    <span className="text-xs">#{hole}</span>
                  </td>
                  {players.map((player) => (
                    <td key={player.name} className="text-center">
                      <Button
                        variant="outline"
                        className="w-12 h-12"
                        onClick={() => openModal(hole, player)}
                      >
                        {player.scores[hole]}
                      </Button>
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td>Total</td>
                {players.map((player) => (
                  <td key={player.name} className="text-center">
                    {player.total}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>

          <div className="flex flex-1 justify-center">
            <Button variant="destructive" size="lg" onClick={clear}>
              Clear
            </Button>
          </div>
        </div>
      )}

      <button
        className="btn btn-secondary btn-circle absolute bottom-4 right-4"
        onClick={() => setAddPlayerModal({ open: true })}
      >
        <Plus />
      </button>

      <ScoreModal
        open={scoreModal.open}
        player={scoreModal.player ?? new PuttPuttPlayer("")}
        closeModal={closeModal}
        addScore={addScoreToPlayer}
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
    const newPlayerList = [...players, new PuttPuttPlayer(name)];
    setPlayers(newPlayerList);
    // add to session storage
    sessionStorage.setItem(
      SESSION_STORAGE_KEYS.PLAYERS,
      JSON.stringify(newPlayerList)
    );
    // reset name
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
              <div key={player.name} className="basis-1/2 p-1">
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
  player,
  closeModal,
  addScore,
}: {
  hole: number;
  open: boolean;
  player: PuttPuttPlayer;
  closeModal: () => void;
  addScore: (player: PuttPuttPlayer, hole: number, score: number) => void;
}) => {
  const handleScoreSelection = (score: number) => {
    addScore(player, hole, score);
  };

  return (
    <Dialog open={open}>
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
