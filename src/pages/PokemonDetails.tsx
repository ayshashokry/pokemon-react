import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Ruler, Weight } from "lucide-react";
import { usePokemon } from "../hooks/usePokemon";
import Loading from "../layout/Loading";
import StatBar from "../components/StatBar";
import InfoCard from "../components/InfoCard";
import AbilityBadge from "../components/AbilityBadge";
import ErrorMessage from "../components/ErrorMessage";

export default function PokemonDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id || "";
  const { data, isLoading, isError, refetch } = usePokemon(id);

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <div className="min-h-screen bg-purple-50 px-4 sm:px-6 lg:px-8 py-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 mb-4 px-3 py-2 bg-white shadow rounded hover:bg-gray-200 text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to list
        </button>
        <ErrorMessage
          title="Failed to Load Pokemon Details"
          onRetry={refetch}
          onGoBack={() => navigate("/")}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-50 px-4 sm:px-6 lg:px-8 py-4">
      <button
        onClick={() => navigate("/")}
        className="flex items-center cursor-pointer gap-2 mb-4 px-3 py-2 bg-white shadow rounded hover:bg-gray-200 text-sm sm:text-base"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to list
      </button>
      <div className="bg-white rounded shadow max-w-2xl mx-auto">
        <div className="bg-purple-500 text-center text-white py-4 px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl capitalize font-bold">
            {data?.name}
          </h2>
          <div className="text-xs sm:text-sm text-purple-100">#{id}</div>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-2 items-center">
            <div>
              {" "}
              <img
                src={data?.sprites.front_default || ""}
                alt={data?.name}
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"
              />
            </div>
            <div className="ml-6 flex-1">
              <div className="mt-6">
                <h3 className="font-semibold text-sm sm:text-base mb-4">
                  Base Stats
                </h3>
                <div className="space-y-3">
                  {data?.stats.map((stat) => (
                    <StatBar
                      key={stat.stat.name}
                      name={stat.stat.name}
                      value={stat.base_stat}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 items-center mt-6">
            <div className="grid grid-cols-2 gap-2">
              <InfoCard
                icon={Ruler}
                label="Height"
                value={`${data?.height} m`}
              />
              <InfoCard
                icon={Weight}
                label="Weight"
                value={`${data?.weight} Kg`}
              />
            </div>
            <div className="ml-6">
              <h3 className="font-bold text-sm sm:text-base mb-3 text-left">
                Abilities
              </h3>
              <div className="text-left">
                {data?.abilities.map((ability) => (
                  <AbilityBadge
                    key={ability.slot}
                    name={ability.ability.name}
                    isHidden={ability.is_hidden}
                  />
                ))}
              </div>
              <h3 className="font-bold text-sm sm:text-base mb-3 mt-6 text-left">
                Base Experience
              </h3>
              <h2 className="text-purple-900 font-bold text-left">
                {data?.base_experience} XP
              </h2>
            </div>
          </div>
        </div>

        <div className="grid gap-4 mt-6"></div>
      </div>
    </div>
  );
}
