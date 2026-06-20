import type { Metadata } from "next";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Land Acknowledgment",
  description:
    "Teambotics acknowledges the Indigenous Peoples whose ancestral territories span the lands now called Canada, where our team members live and work.",
};

const territories = [
  {
    region: "British Columbia",
    nations: [
      "Musqueam, Squamish, and Tsleil-Waututh Peoples (Vancouver)",
      "Lekwungen-speaking Peoples, including the Songhees and Esquimalt Nations (Victoria)",
      "Syilx Okanagan Nation (Okanagan)",
      "Secwépemc Nation (Kamloops / Interior)",
      "Stó:lō Nations (Fraser Valley)",
      "Wet'suwet'en and Gitxsan Peoples (Northern BC)",
      "Haida Nation (Haida Gwaii)",
      "Nuu-chah-nulth Nations (West Coast Vancouver Island)",
    ],
  },
  {
    region: "Alberta",
    nations: [
      "Blackfoot Confederacy: Siksika, Kainai, Piikani Nations (Southern Alberta)",
      "Stoney Nakoda Nations (Foothills / Rockies)",
      "Tsuut'ina Nation (Calgary area)",
      "Métis Nation of Alberta (Region 3 and across the province)",
      "Cree Nations: Maskwacis, Enoch, Alexander, and others (Central / Northern Alberta)",
      "Dene Peoples (Northern Alberta)",
    ],
  },
  {
    region: "Saskatchewan",
    nations: [
      "Nêhiyaw (Plains and Woodland Cree) Nations",
      "Nakoda (Assiniboine) Nation",
      "Dakota and Lakota Peoples",
      "Métis Nation — Saskatchewan (historic Métis homeland)",
      "Saulteaux (Ojibwe) Peoples",
      "Dene Peoples (Northern Saskatchewan)",
    ],
  },
  {
    region: "Manitoba",
    nations: [
      "Anishinaabe (Ojibwe/Saulteaux) Peoples",
      "Nêhiyaw (Cree) Nations",
      "Assiniboine (Nakoda) Nation",
      "Métis Nation — Red River homeland (Winnipeg and area)",
      "Dakota Nation",
      "Dene Peoples (Northern Manitoba)",
      "Ininewuk (Swampy Cree) Peoples",
    ],
  },
  {
    region: "Ontario",
    nations: [
      "Haudenosaunee Confederacy (Mohawk, Onondaga, Cayuga, Oneida, Seneca, Tuscarora)",
      "Anishinaabe Nations: Mississaugas of the Credit, Algonquin, Ojibwe, Odawa, Potawatomi",
      "Huron-Wendat Nation",
      "Métis Nation of Ontario",
      "Oneida Nation of the Thames",
      "Neutral, Mississauga, and many other Nations (throughout the province)",
    ],
  },
  {
    region: "Québec",
    nations: [
      "Kanien'kehá:ka (Mohawk) Nation (Kahnawà:ke, Kanesatake, Akwesasne)",
      "Huron-Wendat Nation (Wendake)",
      "Innu (Montagnais) People (Côte-Nord and Saguenay–Lac-Saint-Jean)",
      "Atikamekw Nation (Haute-Mauricie and Lanaudière)",
      "Algonquin (Anishinaabe) Peoples",
      "Abenaki (Wôbanakiak) People",
      "Wolastoqiyik (Maliseet) People",
      "Mi'kmaq People (Gaspésie and beyond)",
      "Cree Nation of Eeyou Istchee (Northern Québec)",
      "Naskapi Nation (Schefferville area)",
      "Inuit Peoples of Nunavik (Northern Québec)",
    ],
  },
  {
    region: "Atlantic Canada",
    nations: [
      "Mi'kmaq Nation (Nova Scotia, New Brunswick, PEI, Newfoundland)",
      "Wolastoqiyik (Maliseet / Wolastoq) People (New Brunswick, Québec border)",
      "Passamaquoddy (Peskotomuhkati) People",
      "Innu Nation (Nitassinan, Labrador and Québec)",
      "Inuit of Nunatsiavut (Labrador)",
      "Beothuk People (Newfoundland — a Nation no longer with us)",
    ],
  },
  {
    region: "Northern Canada",
    nations: [
      "Inuit Peoples of Nunavut and Inuit Nunangat",
      "Dene Nation and affiliated First Nations (Northwest Territories)",
      "Gwich'in, Inuvialuit, Sahtu Dene, Dehcho, and Akaitcho Peoples (NWT)",
      "Tłı̨chǫ (Dogrib) Nation",
      "Cree Nation of Northern Québec and Ontario",
      "Champagne and Aishihik First Nations (Yukon)",
      "Kwanlin Dün First Nation and Ta'an Kwäch'än Council (Whitehorse area)",
      "Tr'ondëk Hwëch'in (Klondike / Dawson City area)",
      "Kluane, Carcross/Tagish, White River, and other Yukon First Nations",
      "Métis Nation of the Northwest Territories",
    ],
  },
];

export default function LandAcknowledgmentPage() {
  return (
    <main className="land-page">
      <section className="section" id="land-acknowledgment">
        <Container className="land">

          <SectionReveal delay={0.0}>
            <p className="section-eyebrow">LAND ACKNOWLEDGMENT</p>
            <h1 className="land__title">
              We work on every land.<br />
              We acknowledge them all.
            </h1>
          </SectionReveal>

          <SectionReveal className="land__lead" delay={0.08}>
            <p>
              Teambotics is a fully virtual company. Our team members work from homes, cafes,
              and co-working spaces distributed across Turtle Island — the lands now called Canada.
              We do not operate from a single place, so we do not have a single territory to acknowledge.
              We have all of them.
            </p>
            <p>
              We acknowledge the Indigenous Peoples who have been stewards of these lands since time
              immemorial — whose cultures, languages, and relationships to the land persist in the face
              of ongoing colonization. We recognize that the work of reconciliation is not symbolic.
              It requires sustained action, listening, and accountability.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.04}>
            <hr className="land__divider" />
          </SectionReveal>

          <SectionReveal className="land__section" delay={0.06}>
            <h2 className="land__section-title">A note on this acknowledgment</h2>
            <p>
              Land acknowledgments can become rote. We want to avoid that. The list below is not
              exhaustive — Canada&apos;s Indigenous geography is vast and complex, with over 630 First
              Nations communities, dozens of Métis communities, and Inuit peoples across the Arctic.
              Many territories overlap. Many names have multiple spellings or spellings that continue
              to evolve. We have done our best to represent territories accurately, using the names
              Nations use for themselves wherever possible.
            </p>
            <p>
              If you notice an error, an omission, or a preferred name we have not used, please
              reach out. This page will be updated.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.04}>
            <hr className="land__divider" />
          </SectionReveal>

          {territories.map((group, groupIndex) => (
            <SectionReveal key={group.region} className="land__territory" delay={0.04 + groupIndex * 0.02}>
              <h2 className="land__territory-region">{group.region}</h2>
              <ul className="land__territory-list">
                {group.nations.map((nation) => (
                  <li key={nation}>{nation}</li>
                ))}
              </ul>
            </SectionReveal>
          ))}

          <SectionReveal delay={0.04}>
            <hr className="land__divider" />
          </SectionReveal>

          <SectionReveal className="land__closing" delay={0.06}>
            <p>
              We honour the resilience, knowledge, and continued presence of all First Nations,
              Métis, and Inuit Peoples across this land. We are committed to learning, listening,
              and contributing — however we can — to a more just relationship between settlers
              and the original stewards of these territories.
            </p>
            <p className="land__closing-note">
              Miigwech. Merci. Thank you.
            </p>
          </SectionReveal>

        </Container>
      </section>
    </main>
  );
}
