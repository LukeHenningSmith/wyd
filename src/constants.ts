export const transitionTypes = {
  link: "The user arrived at this page by clicking a link on another page.",
  typed:
    "The user arrived at this page by typing the URL in the address bar. This is also used for other explicit navigation actions.",
  auto_bookmark:
    "The user arrived at this page through a suggestion in the UI, for example, through a menu item.",
  auto_subframe:
    "The user arrived at this page through subframe navigation that they didn't request, such as through an ad loading in a frame on the previous page. These don't always generate new navigation entries in the back and forward menus.",
  manual_subframe:
    "The user arrived at this page by selecting something in a subframe.",
  generated:
    "The user arrived at this page by typing in the address bar and selecting an entry that didn't look like a URL, such as a Google Search suggestion. For example, a match might have the URL of a Google Search result page, but it might appear to the user as 'Search Google for ...'. These are different from typed navigations because the user didn't type or see the destination URL. They're also related to keyword navigations.",
  auto_toplevel:
    "The page was specified in the command line or is the start page.",
  form_submit:
    "The user arrived at this page by filling out values in a form and submitting the form. Not all form submissions use this transition type.",
  reload:
    "The user reloaded the page, either by clicking the reload button or by pressing Enter in the address bar. Session restore and Reopen closed tab also use this transition type.",
  keyword:
    "The URL for this page was generated from a replaceable keyword other than the default search provider.",
  keyword_generated: "Corresponds to a visit generated for a keyword.",
};

export function getDescription(type: keyof typeof transitionTypes): string {
  return transitionTypes[type];
}

export const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];
