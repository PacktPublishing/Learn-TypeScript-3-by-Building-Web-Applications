<template>
  <el-card class="box-card lf-songs">
    <div slot="header" class="clearfix">
      <h3>Songs</h3>
    </div>
    <el-container v-loading="songsLoading" direction="vertical">
      <el-row v-for="song in songs" :key="song.id" class="item lf-song" v-if="song.hasLyrics">
        <el-col :span="22" class="lf-song-name">
          <span>{{song.name}}</span>
        </el-col>
        <el-col :span="2">
          <el-button @click="emitSongSelectedEvent(song)" style="" icon="el-icon-video-play"></el-button>
        </el-col>
      </el-row>
    </el-container>
  </el-card>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
import {Song} from '@/domain';
import {PropType} from 'vue/types/options';

@Component({})
export default class SongsList extends Vue {
  @Prop({
    required: true,
  })
  private songs!: Song[];

  @Prop({
    required: false,
    type: Boolean,
  })
  private songsLoading = false;

  @Emit('song-selected')
  public emitSongSelectedEvent(selectedSong: Song): Song {
    console.log('Emitting song selected event: ', selectedSong.name);
    return selectedSong;
  }
}
</script>

<style scoped>
  .lf-songs {
    background-color: var(--background-color);
  }

  .lf-songs h3 {
    color: var(--font-color);
  }

  .lf-song {
    margin-top: 5px;
  }

  .lf-song-name {
    vertical-align: middle;
  }

  .lf-song-name::before {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
    margin-right: -0.25em; /* Adjusts for spacing */
  }

  .lf-song-name > span {
    color: var(--font-color);
    display: block;
    width: 100%;
    text-align: left;
  }
</style>
