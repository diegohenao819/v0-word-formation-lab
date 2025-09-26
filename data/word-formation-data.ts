import type { Row } from "@/types/word-formation"

export const DATA: Row[] = [
  // 1) achieve
  {
    base: "achieve",
    N: { answers: ["achievement"] },
    V: { answers: ["achieve"] },
    Adj: { answers: ["achievable"] },
    Neg: { answers: ["unachievable"] },
    tags: ["un-"],
  },
  // 2) agree
  {
    base: "agree",
    N: { answers: ["agreement"] },
    V: { answers: ["agree"] },
    Adj: { answers: ["agreeable"] },
    Neg: { answers: ["disagreeable"] },
    hint: "For opposition/contrast, dis- is common",
    tags: ["dis-"],
  },
  // 3) challenge
  {
    base: "challenge",
    N: { answers: ["challenge"] },
    V: { answers: ["challenge"] },
    Adj: { answers: ["challenging"] },
    Neg: { answers: ["unchallenging"] },
    tags: ["un-"],
  },
  // 4) collaborate
  {
    base: "collaborate",
    N: { answers: ["collaboration"] },
    V: { answers: ["collaborate"] },
    Adj: { answers: ["collaborative"] },
    Neg: { answers: ["noncollaborative", "non-collaborative"] },
    tags: ["non-"],
  },
  // 5) create
  {
    base: "create",
    N: { answers: ["creation"] },
    V: { answers: ["create"] },
    Adj: { answers: ["creative"] },
    Neg: { answers: ["uncreative"] },
    tags: ["un-"],
  },
  // 6) danger
  {
    base: "danger",
    N: { answers: ["danger"] },
    V: { answers: ["endanger"] },
    Adj: { answers: ["dangerous"] },
    Neg: { answers: ["nondangerous", "non-dangerous"] },
    tags: ["non-"],
  },
  // 7) deny
  {
    base: "deny",
    N: { answers: ["denial"] },
    V: { answers: ["deny"] },
    Adj: { answers: ["deniable"] },
    Neg: { answers: ["undeniable"] },
    tags: ["un-"],
  },
  // 8) decide
  {
    base: "decide",
    N: { answers: ["decision"] },
    V: { answers: ["decide"] },
    Adj: { answers: ["decisive"] },
    Neg: { answers: ["indecisive"] },
    tags: ["in-", "latin-root"],
  },
  // 9) diverse
  {
    base: "diverse",
    N: { answers: ["diversity"] },
    V: { answers: ["diversify"] },
    Adj: { answers: ["diverse"] },
    Neg: { answers: ["nondiverse", "non-diverse"] },
    tags: ["non-"],
  },
  // 10) environment
  {
    base: "environment",
    N: { answers: ["environment"] },
    V: { answers: [], disabled: true, note: "No productive natural verb" },
    Adj: { answers: ["environmental"] },
    Neg: { answers: ["nonenvironmental", "non-environmental"] },
    tags: ["non-"],
  },
  // 11) enjoy
  {
    base: "enjoy",
    N: { answers: ["enjoyment"] },
    V: { answers: ["enjoy"] },
    Adj: { answers: ["enjoyable"] },
    Neg: { answers: ["unenjoyable"] },
    tags: ["un-"],
  },
  // 12) fly
  {
    base: "fly",
    N: { answers: ["flight"] },
    V: { answers: ["fly"] },
    Adj: { answers: ["flying"] },
    Neg: { answers: ["nonflying", "non-flying"] },
    tags: ["non-"],
  },
  // 13) friend
  {
    base: "friend",
    N: { answers: ["friendship"] },
    V: { answers: ["befriend"] },
    Adj: { answers: ["friendly"] },
    Neg: { answers: ["unfriendly"] },
    tags: ["un-"],
  },
  // 14) hate
  {
    base: "hate",
    N: { answers: ["hatred", "hate"] },
    V: { answers: ["hate"] },
    Adj: { answers: ["hateful"] },
    Neg: { answers: ["nonhateful", "non-hateful"] },
    tags: ["non-"],
  },
  // 15) happy
  {
    base: "happy",
    N: { answers: ["happiness"] },
    V: { answers: [], disabled: true },
    Adj: { answers: ["happy"] },
    Neg: { answers: ["unhappy"] },
    tags: ["un-"],
  },
  // 16) improve
  {
    base: "improve",
    N: { answers: ["improvement"] },
    V: { answers: ["improve"] },
    Adj: { answers: ["improvable"] },
    Neg: { answers: ["unimprovable"] },
    tags: ["un-"],
  },
  // 17) interact
  {
    base: "interact",
    N: { answers: ["interaction"] },
    V: { answers: ["interact"] },
    Adj: { answers: ["interactive"] },
    Neg: { answers: ["noninteractive", "non-interactive"] },
    tags: ["non-"],
  },
  // 18) intense
  {
    base: "intense",
    N: { answers: ["intensity"] },
    V: { answers: ["intensify"] },
    Adj: { answers: ["intense"] },
    Neg: { answers: [], disabled: true, note: "No natural prefixed negative (use ‘not intense’ / ‘mild’)"},
    tags: [],
  },
  // 19) responsible
  {
    base: "responsible",
    N: { answers: ["responsibility"] },
    V: { answers: [], disabled: true },
    Adj: { answers: ["responsible"] },
    Neg: { answers: ["irresponsible"] },
    tags: ["ir-", "latin-root"],
  },
  // 20) memory
  {
    base: "memory",
    N: { answers: ["memory"] },
    V: { answers: ["remember", "memorize", "memorise"] },
    Adj: { answers: ["memorable"] },
    Neg: { answers: ["unmemorable"] },
    tags: ["un-"],
  },
  // 21) mother
  {
    base: "mother",
    N: { answers: ["motherhood"] },
    V: { answers: ["mother"] },
    Adj: { answers: ["maternal"] },
    Neg: { answers: ["nonmaternal", "non-maternal"] },
    tags: ["non-"],
  },
  // 22) nation
  {
    base: "nation",
    N: { answers: ["nation"] },
    V: { answers: ["nationalize", "nationalise"] },
    Adj: { answers: ["national"] },
    Neg: { answers: ["nonnational", "non-national"] },
    tags: ["non-"],
  },
  // 23) negotiate
  {
    base: "negotiate",
    N: { answers: ["negotiation"] },
    V: { answers: ["negotiate"] },
    Adj: { answers: ["negotiable"] },
    Neg: { answers: ["nonnegotiable", "non-negotiable"] },
    tags: ["non-"],
  },
  // 24) need
  {
    base: "need",
    N: { answers: ["need", "necessity"] },
    V: { answers: ["need"] },
    Adj: { answers: ["necessary", "needed", "needful"] },
    Neg: { answers: [ "unneeded", "needless"] },
    tags: ["un-", "-less"],
  },
  // 25) observe
  {
    base: "observe",
    N: { answers: ["observation"] },
    V: { answers: ["observe"] },
    Adj: { answers: ["observant", "observable"] },
    Neg: { answers: ["unobservant"] },
    tags: ["un-"],
  },
  // 26) origin
  {
    base: "origin",
    N: { answers: ["origin"] },
    V: { answers: ["originate"] },
    Adj: { answers: ["original"] },
    Neg: { answers: ["unoriginal"] },
    tags: ["un-"],
  },
  // 27) patient
  {
    base: "patient",
    N: { answers: ["patience"] },
    V: { answers: [], disabled: true },
    Adj: { answers: ["patient"] },
    Neg: { answers: ["impatient"] },
    tags: ["im-", "latin-root"],
  },
  // 28) persuade
  {
    base: "persuade",
    N: { answers: ["persuasion"] },
    V: { answers: ["persuade"] },
    Adj: { answers: ["persuasive"] },
    Neg: { answers: ["unpersuasive"] },
    tags: ["un-"],
  },
  // 29) safe
  {
    base: "safe",
    N: { answers: ["safety"] },
    V: { answers: ["save"] },
    Adj: { answers: ["safe"] },
    Neg: { answers: ["unsafe"] },
    tags: ["un-"],
  },
  // 30) simple
  {
    base: "simple",
    N: { answers: ["simplicity"] },
    V: { answers: ["simplify"] },
    Adj: { answers: ["simple"] },
    Neg: { answers: [], disabled: true, note: "Lexical antonym is ‘complex/complicated’" },
    tags: [],
  },
  // 31) stable
  {
    base: "stable",
    N: { answers: ["stability"] },
    V: { answers: ["stabilize", "stabilise"] },
    Adj: { answers: ["stable"] },
    Neg: { answers: ["unstable"] },
    tags: ["un-"],
  },
  // 32) strong
  {
    base: "strong",
    N: { answers: ["strength"] },
    V: { answers: ["strengthen"] },
    Adj: { answers: ["strong"] },
    Neg: { answers: [], disabled: true, note: "Lexical antonym is ‘weak’" },
    tags: [],
  },
  // 33) surprise
  {
    base: "surprise",
    N: { answers: ["surprise"] },
    V: { answers: ["surprise"] },
    Adj: { answers: ["surprising"] },
    Neg: { answers: ["unsurprising"] },
    tags: ["un-"],
  },
  // 34) succeed
  {
    base: "succeed",
    N: { answers: ["success"] },
    V: { answers: ["succeed"] },
    Adj: { answers: ["successful"] },
    Neg: { answers: ["unsuccessful"] },
    tags: ["un-"],
  },
  // 35) suit
  {
    base: "suit",
    N: { answers: ["suitability"] },
    V: { answers: ["suit"] },
    Adj: { answers: ["suitable"] },
    Neg: { answers: ["unsuitable"] },
    tags: ["un-"],
  },
  // 36) vary
  {
    base: "vary",
    N: { answers: ["variety"] },
    V: { answers: ["vary"] },
    Adj: { answers: ["varied", "variable"] },
    Neg: { answers: ["unvaried", "invariable"] },
    tags: ["un-", "in-"],
  },
  // 37) rely
  {
    base: "rely",
    N: { answers: ["reliance","reliability"] },
    V: { answers: ["rely"] },
    Adj: { answers: ["reliable", "reliant"] },
    Neg: { answers: ["unreliable"] },
    tags: ["un-"],
  },
  // 38) advise
  {
    base: "advise",
    N: { answers: ["advice"] },
    V: { answers: ["advise"] },
    Adj: { answers: ["advisable", "advisory"] },
    Neg: { answers: ["inadvisable"] },
    tags: ["in-", "latin-root"],
  },
  // 39) value
  {
    base: "value",
    N: { answers: ["value"] },
    V: { answers: ["value"] },
    Adj: { answers: ["valuable"] },
    Neg: { answers: ["valueless"] },
    hint: "‘invaluable’ means ‘very valuable’, not negative",
    tags: ["-less"],
  },
  // 40) practice
  {
    base: "practice",
    N: { answers: ["practice"] },
    V: { answers: ["practice", "practise"] },
    Adj: { answers: ["practical", "practicable"] },
    Neg: { answers: ["impractical", "impracticable"] },
    hint: "Different nuance",
    tags: ["im-", "latin-root"],
  },
  // 41) think
  {
    base: "think",
    N: { answers: ["thought"] },
    V: { answers: ["think"] },
    Adj: { answers: ["thoughtful"] },
    Neg: { answers: ["thoughtless", "unthinkable"] },
    tags: ["-less", "un-"],
  },
  // 42) protect
  {
    base: "protect",
    N: { answers: ["protection"] },
    V: { answers: ["protect"] },
    Adj: { answers: ["protective", "protected"] },
    Neg: { answers: ["unprotected"] },
    tags: ["un-"],
  },
  // 43) care
  {
    base: "care",
    N: { answers: ["care"] },
    V: { answers: ["care"] },
    Adj: { answers: ["careful", "caring"] },
    Neg: { answers: ["careless", "uncaring"] },
    tags: ["-less", "un-"],
  },
  // 44) attract
  {
    base: "attract",
    N: { answers: ["attraction"] },
    V: { answers: ["attract"] },
    Adj: { answers: ["attractive"] },
    Neg: { answers: ["unattractive"] },
    tags: ["un-"],
  },
  // 45) accept
  {
    base: "accept",
    N: { answers: ["acceptance"] },
    V: { answers: ["accept"] },
    Adj: { answers: ["acceptable"] },
    Neg: { answers: ["unacceptable"] },
    tags: ["un-"],
  },
  // 46) behave
  {
    base: "behave",
    N: { answers: ["behavior", "behaviour"] },
    V: { answers: ["behave"] },
    Adj: { answers: ["well-behaved", "well behaved"] },
    Neg: { answers: ["misbehaved", "badly-behaved", "badly behaved"] },
    tags: ["mis-"],
  },
  // 47) obey
  {
    base: "obey",
    N: { answers: ["obedience"] },
    V: { answers: ["obey"] },
    Adj: { answers: ["obedient"] },
    Neg: { answers: ["disobedient"] },
    tags: ["dis-"],
  },
  // 48) believe
  {
    base: "believe",
    N: { answers: ["belief"] },
    V: { answers: ["believe"] },
    Adj: { answers: ["believable"] },
    Neg: { answers: ["unbelievable"] },
    tags: ["un-"],
  },
  // 49) threaten
  {
    base: "threaten",
    N: { answers: ["threat"] },
    V: { answers: ["threaten"] },
    Adj: { answers: ["threatening"] },
    Neg: { answers: ["unthreatening"] },
    tags: ["un-"],
  },
  // 50) encourage
  {
    base: "encourage",
    N: { answers: ["encouragement"] },
    V: { answers: ["encourage"] },
    Adj: { answers: ["encouraging"] },
    Neg: { answers: ["discouraging"] },
    tags: ["dis-"],
  },
]
