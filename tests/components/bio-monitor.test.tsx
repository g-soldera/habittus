import React from "react";
import { render } from "@testing-library/react-native";
import { BioMonitorComponent } from "@/components/bio-monitor";

describe("BioMonitorComponent", () => {
  const stats = {
    ram: 85,
    hardware: 60,
    cool: 42,
    credits: 1234,
    totalXp: 1500,
    totalGold: 250,
  };

  it("renders main elements with testIDs and accessibility labels", () => {
    const { getByTestId } = render(<BioMonitorComponent stats={stats as any} />);

    const container = getByTestId("bio-monitor");
    expect(container).toBeTruthy();

    const title = getByTestId("bio-monitor-title");
    expect(title.props.children).toBe("BIO-MONITOR");

    // RAM stat
    const ramLabel = getByTestId("bio-stat-ram-label");
    const ramValue = getByTestId("bio-stat-ram-value");
    const ramFill = getByTestId("bio-stat-ram-bar-fill");

    expect(ramLabel.props.children).toBe("RAM");
    expect(ramValue.props.children).toBe("85%");
    expect(ramFill).toBeTruthy();

    // Credits
    const creditsValue = getByTestId("bio-credits-value");
    expect(creditsValue.props.children).toBe(1234);

    // XP / Gold boxes
    const xpValue = getByTestId("bio-xp-value");
    const goldValue = getByTestId("bio-gold-value");

    expect(xpValue.props.children).toBe(1500);
    expect(goldValue.props.children).toBe(250);

    // Accessibility labels
    const ramContainer = getByTestId("bio-stat-ram-container");
    expect(ramContainer.props.accessibilityLabel).toBe("RAM 85%");

    const creditsContainer = getByTestId("bio-credits-container");
    expect(creditsContainer.props.accessibilityLabel).toBe("Credits 1234");
  });
});
