/*
 * Copyright (C) 2017-2020 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */

import { MapControls } from "@here/harp-map-controls";
import {
  MapView,
  FixedClipPlanesEvaluator,
  MapViewEventNames,
} from "@here/harp-mapview";
import { OmvDataSource } from "@here/harp-omv-datasource";

const defaultTheme = "resources/berlin_tilezen_base.json";

export class View {
  constructor(args) {
    this.canvas = args.canvas;
    this.theme = args.theme === undefined ? defaultTheme : args.theme;
    this.mapView = this.initialize();
  }

  initialize() {
    const cpe = new FixedClipPlanesEvaluator(0.1, 1200);
    const mapView = new MapView({
      canvas: this.canvas,
      theme: this.theme,
      decoderUrl: "decoder.bundle.js",
      clipPlanesEvaluator: cpe,
    });
    const omvDataSource = new OmvDataSource({
      authenticationCode: "uZuyZZUDXzJZ3UVUCq-DGo4_m5iy5XCXRM50n6Bkj0g",
    });
    mapView.addDataSource(omvDataSource);
    MapControls.create(mapView);

    // Edit the fixed clip plane evaluator at run time.
    mapView.addEventListener(MapViewEventNames.Render, (_) => {
      cpe.farPlane *= 1.001;
    });
    mapView.beginAnimation();
    return mapView;
  }
}
