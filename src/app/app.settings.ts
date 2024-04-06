export const SETTINGS = {
    /**
     * Disable or enable Analysis Mode.
     * When enabled, it can be activated via a button */
    analysisMode: 'Routes' satisfies AnalysisMode as AnalysisMode,
    /**
     * If Analysis Mode is set to Routes,
     * then only accessing the application via the selected routes
     * will make Analysis Mode accessible
     */
    analysisRoutes: [
        'x-ray',
    ] satisfies string[],
}

type AnalysisMode =
    'Never' | // Analysis mode is off and cannot be turned on
    'Always' | // Analysis mode is on - available via button - and cannot be turned off
    'Routes' | // Analysis mode is on - available via button - only on hidden routes
    never
