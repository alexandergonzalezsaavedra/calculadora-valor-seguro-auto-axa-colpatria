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
    clearQuoteResult: (state) => {
      state.primaBase = null;
      state.valorComercial = null;
      state.factorAntiguedad = null;
      state.vehiculoReemplazo = false;
    },
  },
});

export const { setQuoteResult, clearQuoteResult } = quoteSlice.actions;
export default quoteSlice.reducer;
