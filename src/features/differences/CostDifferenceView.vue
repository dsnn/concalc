<script setup lang="ts"></script>

<template>
  <div class="flex flex-col w-full border-b mt-10">
    <div class="flex text-md w-full gap-2">
      <span class="font-bold">Pris exkl moms</span>
      <input type="number" value="1000" />
    </div>
    <div class="flex text-md w-full gap-6">
      <span class="font-bold">Moms</span>
      <div class="flex gap-2 align-bottom">
        <label>Ingen moms</label>
        <input type="checkbox" value="0" />
      </div>
      <div class="flex gap-2 align-bottom">
        <label>25%</label>
        <input type="checkbox" value="25" />
      </div>
      <div class="flex gap-2 align-bottom">
        <label>12%</label>
        <input type="checkbox" value="25" />
      </div>
      <div class="flex gap-2 align-bottom">
        <label>6%</label>
        <input type="checkbox" value="6" />
      </div>
    </div>
    <div>
      <div class="flex gap-2 align-bottom">
        <span class="font-bold">Över 452 100 kr i lön?</span>
        <input type="checkbox" value="6" />
      </div>
    </div>
    <div>
      <div class="flex gap-2 align-bottom">
        <span class="font-bold">Födelseår</span>
        <input type="number" value="1985" />
      </div>
    </div>
    <div class="flex flex-col">
      <div>
        <h3>Företaget betalar</h3>
        <div class="flex gap-6">
          <span>Kostnad (Varukostnad exkl. moms)</span>
          <div>1000 kr</div>
        </div>
        <div class="flex gap-6">
          <span>Total kostnad for foretaget</span>
          <div>1000 kr</div>
        </div>
      </div>
      <div>
        <h3>Privat genom lon</h3>
        <div class="flex gap-6">
          <span>Nettolon (Varukostnad inkls. moms)</span>
          <div>1250 kr</div>
        </div>
        <div class="flex gap-6">
          <span>Skatt</span>
          <div>1354 kr</div>
        </div>
        <div class="flex gap-6">
          <span>Arbetsgivareavgifter</span>
          <div>0 kr</div>
        </div>
        <div class="flex gap-6">
          <span>Total kostnad for foretaget</span>
          <div>2604 kr</div>
        </div>
      </div>
      <div>
        <h3>Skillnad</h3>
        <div class="flex gap-6">
          <span>Skillnad mellan att låta företaget betala eller privat</span>
          <div>1604 kr</div>
        </div>
      </div>
      <div>
        Exempel för något som kostar 1 000 kr + 25 % i moms: Hur mycket lön måste du ta ut ur ditt
        bolag för att kunna betala 1 250 kr med privata pengar om inkomsten ligger strax över
        brytpunkten och skatten därmed är 52 %? För att du då ska få dessa pengar i handen måste du
        ta ut en lön på 2 604 kr, vilket blir 1 250 kr när inkomstskatten är betald. Med normala
        arbetsgivaravgifter måste bolaget dessutom betala 818 kr på den lönen. Den totala kostnaden
        för dig och bolaget blir därmed 3 422 kr om du betalar med privata pengar. Motsvarande
        kostnad för ett bolag blir 1 000 kr eftersom att momsen kan dras av och räknas inte som en
        kostnad för bolaget. (Kalkylen utgår ifrån att inkomstskatten för inkomsten över brytpunkten
        är 52 procent och 32 procent under brytpunkten. Kalkylen tar inte hänsyn till
        jobbskatteavdrag och detaljer i skattelagstiftningen.)
      </div>
    </div>
  </div>
</template>
