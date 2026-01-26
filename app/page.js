"use client";
import { Github } from "lucide-react";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap } from "lucide-react";

const uid = () => Math.random().toString(36).slice(2);

function clamp20(v) {
  if (Number.isNaN(v)) return 0;
  if (v < 0) return 0;
  if (v > 20) return 20;
  return v;
}

function toNumber(value, currentValue) {
  // Allow empty string
  if (value.trim() === "") return "";

  // Only allow digits, comma, and period
  const cleaned = value.replace(/[^\d.,]/g, "");

  // If nothing valid remains, keep current value
  if (cleaned === "") return currentValue;
  // Replace comma with period for decimal
  const normalized = cleaned.replace(",", ".");
  // Parse the number
  const n = Number(normalized);

  // If invalid, keep current value
  if (Number.isNaN(n)) return currentValue;

  // If exceeds 20 or negative, keep current value
  if (n > 20 || n < 0) return currentValue;

  // Return the cleaned string (not the number) to preserve decimal input like "15."
  return normalized;
}

export default function Page() {
  const [rows, setRows] = useState([
    {
      id: uid(),
      name: "Conception des Systèmes Coopératifs",
      coef: 3,
      td: "",
      exam: "",
    },
    { id: uid(), name: "Ergonomie Web", coef: 2, td: "", exam: "" },
    { id: uid(), name: "Les Réseaux Ad-hoc", coef: 2, td: "", exam: "" },
    {
      id: uid(),
      name: "Méthodes Formelles (Systèmes Distribués)",
      coef: 2,
      td: "",
      exam: "",
    },
    {
      id: uid(),
      name: "Systèmes Embarqués et Mobilité",
      coef: 3,
      td: "",
      exam: "",
    },
    { id: uid(), name: "Anglais", coef: 1, td: "", exam: "" },
    { id: uid(), name: "Option 3", coef: 2, td: "", exam: "" },
    {
      id: uid(),
      name: "JMX et la Gestion des Applications Distribuées",
      coef: 3,
      td: "",
      exam: "",
    },
  ]);

  const updateRow = (id, patch) => {
    setRows((r) => r.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  };

  const computed = useMemo(() => {
    let sumWeighted = 0;
    let sumCoef = 0;

    const perRow = rows.map((m) => {
      const td = m.td === "" ? null : clamp20(m.td);
      const exam = m.exam === "" ? null : clamp20(m.exam);

      const moduleNote =
        td !== null && exam !== null ? td * 0.5 + exam * 0.5 : null;

      // Always count modules with coef > 0, even if note is not calculated yet
      if (m.coef > 0) {
        if (moduleNote !== null) {
          sumWeighted += moduleNote * m.coef;
        }
        sumCoef += m.coef;
      }

      return { ...m, moduleNote };
    });

    const moyenne = sumCoef > 0 ? sumWeighted / sumCoef : null;

    return { perRow, sumCoef, moyenne };
  }, [rows]);

  const getGradeColor = (note) => {
    if (note === null) return "text-gray-400";
    if (note >= 16) return "text-emerald-600";
    if (note >= 14) return "text-green-600";
    if (note >= 12) return "text-blue-600";
    if (note >= 10) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className=" bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-3 py-6 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-3 "
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <GraduationCap className="w-8 h-8 sm:w-12 sm:h-12 text-indigo-600" />
            </motion.div>{" "}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Calculateur de Moyenne{" "}
            </h1>{" "}
          </div>{" "}
          <p className="text-gray-600 text-sm sm:text-lg px-4">
            TD 50 % •Examen 50 % •Note du module = (TD + Examen) / 2{" "}
          </p>{" "}
        </motion.div>{" "}
        {/* Moyenne card - floating at bottom */}{" "}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md"
        >
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-4 text-white backdrop-blur-sm bg-opacity-95">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <div className="text-xs uppercase tracking-wider text-indigo-100 mb-1">
                  Moyenne générale{" "}
                </div>{" "}
                <motion.div
                  key={computed.moyenne}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-4xl sm:text-5xl font-bold"
                >
                  {computed.moyenne === null
                    ? "—"
                    : computed.moyenne.toFixed(2)}{" "}
                </motion.div>{" "}
              </div>{" "}
              <div className="text-right">
                <div className="text-xs text-indigo-100"> Coef total </div>{" "}
                <div className="text-2xl font-bold"> {computed.sumCoef} </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </motion.div>{" "}
        {/* Mobile Card Layout */}{" "}
        <div className="space-y-4 pb-32 ">
          <AnimatePresence mode="popLayout">
            {" "}
            {computed.perRow.map((m, index) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                layout
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3">
                  <div className="flex-1 min-w-0">
                    {" "}
                    {m.name ? (
                      <h3 className="text-white font-semibold text-sm sm:text-base">
                        {" "}
                        {m.name}{" "}
                      </h3>
                    ) : (
                      <input
                        value={m.name}
                        onChange={(e) =>
                          updateRow(m.id, { name: e.target.value })
                        }
                        placeholder="Nom du module"
                        className="w-full bg-white/20 text-white placeholder-white/60 px-3 py-1.5 rounded-lg text-sm sm:text-base outline-none border border-white/30 focus:border-white"
                      />
                    )}{" "}
                  </div>{" "}
                </div>{" "}
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">
                        TD / 20{" "}
                      </label>{" "}
                      <input
                        value={m.td}
                        inputMode="decimal"
                        onChange={(e) =>
                          updateRow(m.id, {
                            td: toNumber(e.target.value, m.td),
                          })
                        }
                        placeholder="12.5"
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                      />
                    </div>{" "}
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">
                        Examen / 20{" "}
                      </label>{" "}
                      <input
                        value={m.exam}
                        inputMode="decimal"
                        onChange={(e) =>
                          updateRow(m.id, {
                            exam: toNumber(e.target.value, m.exam),
                          })
                        }
                        placeholder="14"
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                      />
                    </div>{" "}
                  </div>{" "}
                  <div className="mt-3">
                    <label className="text-xs text-gray-500 mb-1 block text-center">
                      Note Module{" "}
                    </label>{" "}
                    <div className="h-12 flex items-center justify-center">
                      <motion.span
                        key={m.moduleNote}
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`text-3xl font-bold ${getGradeColor(
                          m.moduleNote
                        )}`}
                      >
                        {m.moduleNote === null ? "—" : m.moduleNote.toFixed(2)}{" "}
                      </motion.span>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </motion.div>
            ))}{" "}
            <footer className="w-full py-4 text-center text-sm text-gray-400">
              <a
                href="https://github.com/mossaabsdj"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-sky-400 transition-colors"
              >
                <Github className="h-4 w-4" />
                by Mossaab{" "}
              </a>{" "}
            </footer>{" "}
          </AnimatePresence>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
