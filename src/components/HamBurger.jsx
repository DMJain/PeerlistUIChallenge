import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import {
  Menu,
  X,
  Home,
  Mail,
  User,
  Settings,
} from "lucide-react";
import "./hambuger.css";

export default function HamBurger() {
  const [menuOpen, setMenuOpen] = useState(false);
  const audioStarted = useRef(false);

  const openSynth = useRef(null);
  const closeSynth = useRef(null);

  useEffect(() => {
    openSynth.current = new Tone.MembraneSynth({
      octaves: 4,
      pitchDecay: 0.1,
      envelope: {
        attack: 0.01,
        decay: 0.2,
        sustain: 0.01,
        release: 0.3,
      },
    }).toDestination();
    openSynth.current.volume.value = -6;

    closeSynth.current = new Tone.Synth({
      oscillator: { type: "sine" },
      envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0,
        release: 0.1,
      },
    }).toDestination();
    closeSynth.current.volume.value = -10;

    const handleOutsideClick = (e) => {
      if (
        !e.target.closest("#menu-container") &&
        document.getElementById("menu-container")?.classList.contains("menu-open")
      ) {
        setMenuOpen(false);
        if (audioStarted.current) {
          closeSynth.current.triggerAttackRelease("C5", "16n", Tone.now());
        }
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const toggleMenu = async () => {
    if (!audioStarted.current) {
      await Tone.start();
      audioStarted.current = true;
      console.log("Audio context started");
    }

    if (!menuOpen) {
      openSynth.current.triggerAttackRelease("C2", "8n", Tone.now());
    } else {
      closeSynth.current.triggerAttackRelease("C5", "16n", Tone.now());
    }

    setMenuOpen((prev) => !prev);
  };

  return (
      <div
        id="menu-container"
        className={`fixed top-4 left-4 z-50 flex flex-col items-center transition-all ${menuOpen ? "menu-open" : ""}`}
      >
        <button
          id="menu-toggle"
          onClick={toggleMenu}
          className="h-12 w-12 rounded-full bg-white text-black flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
        >
          <div className="icon-container">
            <Menu className="lucide-menu" />
            <X className="lucide-x" />
          </div>
        </button>

        <div id="menu-items" className="flex flex-col items-center">
          {[Home, Mail, User, Settings].map((Icon, i) => (
            <button
              key={i}
              className="menu-item group h-12 w-12 rounded-full bg-white text-zinc-500 flex items-center justify-center shadow-sm"
            >
              <Icon className="transition-colors duration-200" size={20} />
            </button>
          ))}
        </div>
      </div>
  );
}
