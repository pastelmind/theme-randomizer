/**
 * @file KoLmafia theme randomizer. Choose a random theme every day!
 * @author pastelmind
 * @license MIT
 */

const {
  abort,
  print,
  printHtml,
  getProperty,
  setProperty,
} = require("kolmafia");

/**
 * @typedef {object} KoLmafiaTheme
 * @property {string} name Theme name shown to user
 * @property {string} id Theme ID stored in KoLmafia property
 */

/**
 * Helper function to make copy-pasting KoLmafia code easier
 * @param {string} themeName
 * @param {string} themeId
 * @return {KoLmafiaTheme}
 */
function put(themeName, themeId) {
  return { name: themeName, id: themeId };
}

/**
 * Known FlatLaf themes as of KoLmafia r20534.
 * Copied straight from net/sourceforge/kolmafia/KoLGUIConstants.java
 */
const THEMES = {
  light: [
    put(
      "Arc - Orange",
      "com.formdev.flatlaf.intellijthemes.FlatArcOrangeIJTheme"
    ),
    put("Arc", "com.formdev.flatlaf.intellijthemes.FlatArcIJTheme"),
    put(
      "Atom One Light Contrast",
      "com.formdev.flatlaf.intellijthemes.materialthemeuilite.FlatAtomOneLightContrastIJTheme"
    ),
    put(
      "Atom One Light",
      "com.formdev.flatlaf.intellijthemes.materialthemeuilite.FlatAtomOneLightIJTheme"
    ),
    put(
      "Cyan light",
      "com.formdev.flatlaf.intellijthemes.FlatCyanLightIJTheme"
    ),
    put("FlatMap Light", "com.formdev.flatlaf.FlatLightLaf"),
    put(
      "GitHub Contrast",
      "com.formdev.flatlaf.intellijthemes.materialthemeuilite.FlatGitHubContrastIJTheme"
    ),
    put(
      "GitHub",
      "com.formdev.flatlaf.intellijthemes.materialthemeuilite.FlatGitHubIJTheme"
    ),
    put("Gray", "com.formdev.flatlaf.intellijthemes.FlatGrayIJTheme"),
    put(
      "Light Flat",
      "com.formdev.flatlaf.intellijthemes.FlatLightFlatIJTheme"
    ),
    put(
      "Light Owl Contrast",
      "com.formdev.flatlaf.intellijthemes.materialthemeuilite.FlatLightOwlContrastIJTheme"
    ),
    put(
      "Light Owl",
      "com.formdev.flatlaf.intellijthemes.materialthemeuilite.FlatLightOwlIJTheme"
    ),
    put(
      "Material Lighter Contrast",
      "com.formdev.flatlaf.intellijthemes.materialthemeuilite.FlatMaterialLighterContrastIJTheme"
    ),
    put(
      "Material Lighter",
      "com.formdev.flatlaf.intellijthemes.materialthemeuilite.FlatMaterialLighterIJTheme"
    ),
    put(
      "Solarized Light Contrast",
      "com.formdev.flatlaf.intellijthemes.materialthemeuilite.FlatSolarizedLightContrastIJTheme"
    ),
    put(
      "Solarized Light",
      "com.formdev.flatlaf.intellijthemes.FlatSolarizedLightIJTheme"
    ),
    put(
      "Material Solarized Light",
      "com.formdev.flatlaf.intellijthemes.materialthemeuilite.FlatSolarizedLightIJTheme"
    ),
  ],
  dark: [
    put(
      "Arc Dark - Orange",
      "com.formdev.flatlaf.intellijthemes.FlatArcDarkOrangeIJTheme"
    ),
    put(
      "Arc Dark Contrast",
      "com.formdev.flatlaf.intellijthemes.materialthemeuilite.FlatArcDarkContrastIJTheme"
    ),
    put("Arc Dark", "com.formdev.flatlaf.intellijthemes.FlatArcDarkIJTheme"),
    put(
      "Material Arc Dark",
      "com.formdev.flatlaf.intellijthemes.materialthemeuilite.FlatArcDarkIJTheme"
    ),
    put(
      "Atom One Dark Contrast",
      "com.formdev.flatlaf.intellijthemes.materialthemeuilite.FlatAtomOneDarkContrastIJTheme"
    ),
    put(
      "Atom One Dark",
      "com.formdev.flatlaf.intellijthemes.materialthemeuilite.FlatAtomOneDarkIJTheme"
    ),
    put("Carbon", "com.formdev.flatlaf.intellijthemes.FlatCarbonIJTheme"),
    put("Cobalt 2", "com.formdev.flatlaf.intellijthemes.FlatCobalt2IJTheme"),
    put("Flatmap Darcula", "com.formdev.flatlaf.FlatDarculaLaf"),
    put("Dark Flat", "com.formdev.flatlaf.intellijthemes.FlatDarkFlatIJTheme"),
    put(
      "Dark Purple",
      "com.formdev.flatlaf.intellijthemes.FlatDarkPurpleIJTheme"
    ),
    put(
      "Dracula Contrast",
      "com.formdev.flatlaf.intellijthemes.materialthemeuilite.FlatDraculaContrastIJTheme"
    ),
    put("Dracula", "com.formdev.flatlaf.intellijthemes.FlatDraculaIJTheme"),
    put(
      "Dracula Theme",
      "com.formdev.flatlaf.intellijthemes.materialthemeuilite.FlatDraculaIJTheme"
    ),
    put("FlatMap Dark", "com.formdev.flatlaf.FlatDarkLaf"),
    put(
      "Gradianto Dark Fuchsia",
      "com.formdev.flatlaf.intellijthemes.FlatGradiantoDarkFuchsiaIJTheme"
    ),
    put(
      "Gradianto Deep Ocean",
      "com.formdev.flatlaf.intellijthemes.FlatGradiantoDeepOceanIJTheme"
    ),
    put(
      "Gradianto Midnight Blue",
      "com.formdev.flatlaf.intellijthemes.FlatGradiantoMidnightBlueIJTheme"
    ),
    put(
      "Gruvbox Dark Hard",
      "com.formdev.flatlaf.intellijthemes.FlatGruvboxDarkHardIJTheme"
    ),
    put(
      "Gruvbox Dark Medium",
      "com.formdev.flatlaf.intellijthemes.FlatGruvboxDarkMediumIJTheme"
    ),
    put(
      "Gruvbox Dark Soft",
      "com.formdev.flatlaf.intellijthemes.FlatGruvboxDarkSoftIJTheme"
    ),
    put(
      "Hiberbee Dark",
      "com.formdev.flatlaf.intellijthemes.FlatHiberbeeDarkIJTheme"
    ),
    put(
      "High contrast",
      "com.formdev.flatlaf.intellijthemes.FlatHighContrastIJTheme"
    ),
    put(
      "Material Darker Contrast",
      "com.formdev.flatlaf.intellijthemes.materialthemeuilite.FlatMaterialDarkerContrastIJTheme"
    ),
    put(
      "Material Darker",
      "com.formdev.flatlaf.intellijthemes.materialthemeuilite.FlatMaterialDarkerIJTheme"
    ),
    put(
      "Material Deep Ocean Contrast",
      "com.formdev.flatlaf.intellijthemes.materialthemeuilite.FlatMaterialDeepOceanContrastIJTheme"
    ),
    put(
      "Material Deep Ocean",
      "com.formdev.flatlaf.intellijthemes.materialthemeuilite.FlatMaterialDeepOceanIJTheme"
    ),
    put(
      "Material Design Dark",
      "com.formdev.flatlaf.intellijthemes.FlatMaterialDesignDarkIJTheme"
    ),
    put(
      "Material Oceanic Contrast",
      "com.formdev.flatlaf.intellijthemes.materialthemeuilite.FlatMaterialOceanicContrastIJTheme"
    ),
    put(
      "Material Oceanic",
      "com.formdev.flatlaf.intellijthemes.materialthemeuilite.FlatMaterialOceanicIJTheme"
    ),
    put(
      "Material Palenight Contrast",
      "com.formdev.flatlaf.intellijthemes.materialthemeuilite.FlatMaterialPalenightContrastIJTheme"
    ),
    put(
      "Material Palenight",
      "com.formdev.flatlaf.intellijthemes.materialthemeuilite.FlatMaterialPalenightIJTheme"
    ),
    put("Monocai", "com.formdev.flatlaf.intellijthemes.FlatMonocaiIJTheme"),
    put(
      "Monokai Pro Contrast",
      "com.formdev.flatlaf.intellijthemes.materialthemeuilite.FlatMonokaiProContrastIJTheme"
    ),
    put(
      "Monokai Pro",
      "com.formdev.flatlaf.intellijthemes.materialthemeuilite.FlatMonokaiProIJTheme"
    ),
    put(
      "Night Owl Contrast",
      "com.formdev.flatlaf.intellijthemes.materialthemeuilite.FlatNightOwlContrastIJTheme"
    ),
    put(
      "Night Owl",
      "com.formdev.flatlaf.intellijthemes.materialthemeuilite.FlatNightOwlIJTheme"
    ),
    put("Nord", "com.formdev.flatlaf.intellijthemes.FlatNordIJTheme"),
    put("One Dark", "com.formdev.flatlaf.intellijthemes.FlatOneDarkIJTheme"),
    put(
      "Solarized Dark Contrast",
      "com.formdev.flatlaf.intellijthemes.materialthemeuilite.FlatSolarizedDarkContrastIJTheme"
    ),
    put(
      "Solarized Dark",
      "com.formdev.flatlaf.intellijthemes.FlatSolarizedDarkIJTheme"
    ),
    put(
      "Material Solarized Dark",
      "com.formdev.flatlaf.intellijthemes.materialthemeuilite.FlatSolarizedDarkIJTheme"
    ),
    put("Spacegray", "com.formdev.flatlaf.intellijthemes.FlatSpacegrayIJTheme"),
    put("Vuesion", "com.formdev.flatlaf.intellijthemes.FlatVuesionIJTheme"),
  ],
};

/**
 * Picks a random FlatLaf-driven KoLmafia theme.
 * @param {"light" | "dark"} [group] If given, only picks themes belonging to
 *    this group. Default behavior is to pick one from all FlatLaf themes.
 * @returns {KoLmafiaTheme}
 */
function pickRandomTheme(group) {
  /** @type {KoLmafiaTheme[]} */
  let themePool = [];

  if (group === "light") {
    themePool = THEMES.light;
  } else if (group === "dark") {
    themePool = THEMES.dark;
  } else {
    themePool = themePool.concat(THEMES.light, THEMES.dark);
  }

  return themePool[Math.floor(Math.random() * themePool.length)];
}

const KOLMAFIA_THEME_PROPERTY = "swingLookAndFeel";

/**
 * gCLI entrypoint.
 * @param {string} commands
 */
module.exports.main = (commands) => {
  // Default command is help
  commands = commands ? commands.trim() : "help";

  if (commands === "?" || commands === "help") {
    printHtml("Usage: <b>random-theme<b> ? | help | all | light | dark");
  } else if (
    commands === "all" ||
    commands === "light" ||
    commands === "dark"
  ) {
    /** @type {Parameters<pickRandomTheme>[0]} */
    let group = undefined;
    if (commands !== "all") group = commands;

    const prevThemeId = getProperty(KOLMAFIA_THEME_PROPERTY);
    let theme = pickRandomTheme(group);
    while (theme.id === prevThemeId) {
      theme = pickRandomTheme(group);
    }

    setProperty(KOLMAFIA_THEME_PROPERTY, theme.id);
    print("Changed KoLmafia theme to " + theme.name);
  } else {
    abort(
      "Invalid command: " +
        commands +
        "<br>Use <kbd><b>random-theme<b> help</kbd> for usage"
    );
  }
};
