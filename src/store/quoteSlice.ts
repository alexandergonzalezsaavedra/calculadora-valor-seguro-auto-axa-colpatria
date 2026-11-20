import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface QuoteState {
  primaBase: number | null;
  valorComercial: number | null;
  factorAntiguedad: number | null;
  vehiculoReemplazo: boolean;
}

export interface SetQuotePayload {
  primaBase: number;
  valorComercial: number;
  factorAntiguedad: number;
  vehiculoReemplazo: boolean;
}

const initialState: QuoteState = {
  primaBase: null,
  valorComercial: null,
  factorAntiguedad: null,
  vehiculoReemplazo: false,
};

const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    setQuoteResult: (state, action: PayloadAction<SetQuotePayload>) => {
      state.primaBase = action.payload.primaBase;
      state.valorComercial = action.payload.valorComercial;
      state.factorAntiguedad = action.payload.factorAntiguedad;
      state.vehiculoReemplazo = action.payload.vehiculoReemplazo;
    },
    // Se sincroniza en vivo entre el checkbox del formulario y la selección de plan
    setVehiculoReemplazo: (state, action: PayloadAction<boolean>) => {
      state.vehiculoReemplazo = action.payload;
    },
    clearQuoteResult: (state) => {
      state.primaBase = null;
      state.valorComercial = null;
      state.factorAntiguedad = null;
      state.vehiculoReemplazo = false;
    },
  },
});

export const { setQuoteResult, setVehiculoReemplazo, clearQuoteResult } =
  quoteSlice.actions;
export default quoteSlice.reducer;
