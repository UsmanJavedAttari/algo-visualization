<template>
  <form @submit.prevent="generateResults">
    <div class="row">
      <div class="col-12 col-md-4">
        <base-select
          label="Algorithm Type"
          :items="ALGOS"
          v-model="algoOps.Algo"
          hint="Select any algorithm"
          required
        />
      </div>
      <div class="col-12 col-md-4" v-if="!!algoOps.Algo">
        <base-select
          label="Case"
          :items="['Best', 'Average', 'Worst']"
          v-model="algoOps.Case"
          hint="Select any case"
          required
        />
      </div>
      <div class="col-12 col-md-4" v-if="!!algoOps.Case">
        <base-select
          label="Value of N"
          :items="N_VALUES"
          v-model="algoOps.ValueOfN"
          hint="Select any value of N"
          required
        />
      </div>
      <div class="col-12 d-flex justify-content-center">
        <base-btn
          class="btn btn-success btn-sm"
          type="submit"
          :loading="loading"
        >
          Generate Results
          <template #loading>Generating</template>
        </base-btn>
      </div>
    </div>
  </form>
  <div class="table-responsive mt-3">
    <table class="table table-bordered table-hover table-sm mx-auto">
      <thead>
        <tr>
          <th>Algo Name</th>
          <th colspan="3" v-for="(n, i) in N_VALUES" :key="i">n = {{ n }}</th>
        </tr>
        <tr>
          <th></th>
          <template v-for="(n, i) in N_VALUES" :key="i">
            <th>Best</th>
            <th>Average</th>
            <th>Worst</th>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(algo, i) in Object.keys(results)" :key="i">
          <th>{{ algo }}</th>
          <template v-for="(n, ind) in N_VALUES" :key="`key-${ind}`">
            <td>
              {{ getTime(`${algo}.${n}.Best`) }}
            </td>
            <td>
              {{ getTime(`${algo}.${n}.Average`) }}
            </td>
            <td>
              {{ getTime(`${algo}.${n}.Worst`) }}
            </td>
          </template>
        </tr>
        <tr v-if="!Object.keys(results).length">
          <td colspan="100%" class="text-center">No results yet.</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="mt-3 row">
    <div class="col-12 col-md-6" v-for="(algo, i) in ALGOS" :key="i">
      <canvas :id="`chart-${algo}-bar`" />
    </div>
  </div>
  <div class="mt-3 row">
    <div class="col-12 col-md-6" v-for="(algo, i) in ALGOS" :key="i">
      <canvas :id="`chart-${algo}-line`" />
    </div>
  </div>
</template>

<script lang="ts" src="./home.component.ts" />
