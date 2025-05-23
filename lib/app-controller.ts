// App class to control global effects
export class AppController {
  // SlyFetch logo index
  slyfetchLogo = 0

  // Router instance
  private router: any

  // Method to set router
  setRouter(router: any) {
    this.router = router
  }

  // Method to set background animation
  setBgAnimation(animation: string) {
    return `Background animation functionality has been removed`
  }

  // Method to set SlyFetch logo
  setSlyFetchLogo(logoIndex: number) {
    this.slyfetchLogo = logoIndex
    return {
      output: `SlyFetch logo set to style ${logoIndex}`,
      isSuccess: true,
      isError: false,
    }
  }

  // Method to handle all app commands
  handleCommand(command: string, args: string[]): { output: string; isSuccess: boolean; isError: boolean } {
    // Default response
    let output = ""
    let isSuccess = false
    let isError = false

    // Handle bg.animation command
    if (command === "app.bg.animation") {
      const animation = args.join(" ").trim()
      const availableAnimations = [
        "none",
        "rain"
      ]

      if (!animation || animation === "list") {
        output = `Available app background animations: ${availableAnimations.join(", ")}`
        isSuccess = true
      } else if (availableAnimations.includes(animation)) {
        output = this.setBgAnimation(animation)
        isSuccess = true
      } else {
        output = `Unknown animation: "${animation}". Type "app.bg.animation list" to see available options.`
        isError = true
      }
    }
    // Handle slyfetch.logo command
    else if (command === "app.slyfetch.logo") {
      if (args.length !== 1) {
        output = "Usage: app.slyfetch.logo [0-9] - Sets the SlyFetch logo style"
        isError = true
      } else {
        const logoIndex = Number.parseInt(args[0])
        if (isNaN(logoIndex) || logoIndex < 0 || logoIndex > 9) {
          output = `Invalid logo index. Please use a number between 0 and 9`
          isError = true
        } else {
          const result = this.setSlyFetchLogo(logoIndex)
          output = result.output
          isSuccess = result.isSuccess
          isError = result.isError
        }
      }
    }
    // Handle nerd_mode command
    else if (command === "nerd_mode") {
      if (args.length !== 1) {
        output = "Usage: nerd_mode [0|1] - Toggles between GUI and Terminal mode"
        isError = true
      } else {
        const mode = Number.parseInt(args[0])
        if (isNaN(mode) || (mode !== 0 && mode !== 1)) {
          output = "Invalid mode. Use 0 for GUI mode or 1 for Terminal mode"
          isError = true
        } else {
          if (!this.router) {
            output = "Router not initialized. Please try again."
            isError = true
          } else {
            // Use Next.js router for navigation
            this.router.push(mode === 0 ? "/gui" : "/terminal")
            output = `Switching to ${mode === 0 ? "GUI" : "Terminal"} mode...`
            isSuccess = true
          }
        }
      }
    }
    else {
      output = `Unknown app command: ${command}`
      isError = true
    }

    return { output, isSuccess, isError }
  }
} 